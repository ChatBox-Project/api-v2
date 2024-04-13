import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities/account.entity';
import { ErrorResponse } from 'src/errors';

import * as crypto from 'crypto';
import { AccountRepository } from 'src/apps/accounts/account.repository';
@Injectable()
export class KeyTokenService {
  constructor(@InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository) {}

  public async createKeyToken({ accountId, publicKey }): Promise<string> {
    try {
      const publicKeyString = publicKey.toString();
      // console.log(publicKey)
      const tokens = await this._accountRepository.create({
        user: accountId,
        keyToken: publicKeyString,
      });
      return tokens ? publicKey : null;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'REGISTER_FAIL',
      });
    }
  }

  public async generateRSAKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    return new Promise((resolve, reject) => {
      crypto.generateKeyPair(
        'rsa',
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        },
        (err, publicKey, privateKey) => {
          if (err) {
            reject(err);
          } else {
            resolve({ publicKey: publicKey.toString(), privateKey: privateKey.toString() });
          }
        },
      );
    });
  }
}
