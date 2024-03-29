import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { ErrorResponse } from 'src/errors';
import { AccountRepository } from 'src/repositories';

@Injectable()
export class KeyTokenService {
  constructor(@InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository) {}

  public async createKeyToken({ accountId, publicKey }): Promise<unknown> {
    try {
      const publicKeyString = publicKey.toString();
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
}
