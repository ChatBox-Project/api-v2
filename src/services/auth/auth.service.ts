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
      // check password
      

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
        const publicKeyString = await this._keyTokenService.createKeyToken({ accountId: newUser.id, publicKey: publicKey });

        const tokens = await createTokenPair({ accountId: newUser.id }, publicKeyString, privateKey);

        const saveAccount = new AccountEntity({ ...newUser, publicKey: publicKeyString.toString(), refreshToken: tokens.refreshToken });
        const test = await this._accountRepository.save(saveAccount);
        console.log('test', test);
        return {
          status: 200,
          message: 'Register Success',
          metadata: {
            user: newUser,
            token: tokens.accessToken,
          },
        };
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
