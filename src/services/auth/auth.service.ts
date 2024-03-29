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
  private async createAccount(_accountRegister: UserRegisterDto, isApp: boolean): Promise<unknown> {
    try {
      const salt = bcrypt.genSaltSync(10);
      // Hasd Pw asynchronously
      const hashPwPromise = Promise.all([bcrypt.hash(_accountRegister.password, salt), bcrypt.hash(_accountRegister.passwordSalt, salt)]);
      const [HashedPw, HashedPwSalt] = await hashPwPromise;

      const newAccount = await this._accountRepository.create({
        ..._accountRegister,
        password: HashedPw,
        passwordSalt: HashedPwSalt,
        verified: false,
        verificationExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        loginAttempts: 0,
        blockExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      // Generate RSA key pair asynchronously
      const { publicKey, privateKey } = await this._keyTokenService.generateRSAKeyPair();

      // create Key Token
      const publicKeyString = await this._keyTokenService.createKeyToken({ accountId: newAccount.id, publicKey });

      // Create token pair
      const tokens = await createTokenPair({ accountId: newAccount.id }, publicKeyString, privateKey);

      // update account with token and publickey
      newAccount.publicKey = publicKeyString.toString();
      newAccount.refreshToken = tokens.refreshToken;
      await this._accountRepository.save(newAccount);

      return {
        status: 200,
        message: 'Register success',
        metadata: {
          user: newAccount,
          token: tokens.accessToken,
        },
      };
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'REGISTER_FAIL',
      });
    }
  }
}
