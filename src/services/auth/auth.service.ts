import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountRepository } from 'src/repositories';
import { UserRegisterDto, checkUsername } from 'src/validators';

import { ErrorResponse } from 'src/errors';
import { UserBaseEntity } from 'src/entities/user.base.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AccountService } from '../account';
import { KeyTokenService } from '../key/keyToken.service';
import { createTokenPair } from 'src/utils/auth.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    private readonly _accountService: AccountService,
    private readonly _keyTokenService: KeyTokenService,
  ) {}
  public async login() {
    console.log('Login...');
  }

  public async register(_accountRegister: UserRegisterDto, _header: any): Promise<unknown> {
    try {
      const holderAccount = await this._accountService.getAccountByUsername(_accountRegister.username);
      if (holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Username is exist'),
          errorCode: 'USERNAME_EXIST',
        });
      }
      return await this.createAccount(_accountRegister, _header.isApp);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'REGISTER_FAIL',
      });
    }
  }
  private async createAccount(_accountRegister: UserRegisterDto, isApp: boolean): Promise<boolean> {
    try {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(_accountRegister.password, salt);

      const newUser = await this._accountRepository.create({
        ..._accountRegister,
        password: hashedPassword,
      });

      if (newUser) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });
        // console.log('publicKey', publicKey);
        // console.log('privateKey', privateKey);
        /* This line of code is calling the `createKeyToken` method from the `_keyTokenService` service
        and passing an object with `accountId` and `publicKey` properties as arguments. The
        `createKeyToken` method likely generates a token or key associated with the provided account
        ID and public key, and then assigns the generated key to the `keyString` constant for
        further use in the application. */
        const publicKeyString = await this._keyTokenService.createKeyToken({ accountId: newUser.id, publicKey: publicKey });

        const tokens = await createTokenPair({ accountId: newUser.id }, publicKeyString, privateKey);
        
      }
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'REGISTER_FAIL',
      });
    }

    return true;
  }
}
