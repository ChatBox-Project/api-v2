import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities/account.entity';


import { ErrorResponse } from 'src/errors';
import * as bcrypt from 'bcrypt';

import { KeyTokenService } from './keys/keyToken.service';
import { createTokenPair } from 'src/common/auth/auth.util';
import { ResponseService } from '../../common/res';
import { AccountService } from '../accounts/account.service';
import { AccountRepository } from '../accounts/account.repository';
import { AccountLoginDto, AccountRegisterDto } from './dto';
import { checkUsername } from 'src/validators';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    private readonly _accountService: AccountService,
    private readonly _keyTokenService: KeyTokenService,
    private readonly _respone: ResponseService,
  ) {}
  public async login(_accountLogin: AccountLoginDto, _headers: any): Promise<unknown> {
    const isApp = _headers?.isapp === 'true' || _headers?.isapp === true ? true : false;

    try {
      const holderAccount = await this._accountRepository.findOne({ where: { phoneNumber: _accountLogin.phoneNumber } });
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('PhoneNumber is not exist'),
          errorCode: 'PHONENUMBER_NOT_EXIST',
        });
      }

      const isMatch = await bcrypt.compare(_accountLogin.password, holderAccount.password);

      if (!isMatch) {
        throw new ErrorResponse({
          ...new BadRequestException('Password is not match'),
          errorCode: 'PASSWORD_NOT_MATCH',
        });
      }

      if (!isMatch) {
        throw new ErrorResponse({
          ...new BadRequestException('Password is not match'),
          errorCode: 'PASSWORD_NOT_MATCH',
        });
      }

      delete _accountLogin.password;

      // const { publicKey, privateKey } = await this._keyTokenService.generateRSAKeyPair();
      // console.log('publicKey:: ', publicKey, 'privateKey:: ', privateKey);

      // Response
      const metadata = { token: holderAccount.accessToken };

      // console.log('metadata:: ', metadata);
      const res = await this._respone.createResponse(200, 'Login success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'Login_FAIL',
      });
    }
  }

  public async register(_accountRegister: AccountRegisterDto, _header: any): Promise<unknown> {
    try {
      // Check phone number
      const isPhoneNumber = await checkUsername(_accountRegister.phoneNumber);
      if (!isPhoneNumber) {
        throw new ErrorResponse({
          ...new BadRequestException('Invalid phone number'),
          errorCode: 'INVALID_PHONE_NUMBER',
        });
      }

      const holderAccount = await this._accountService.getAccountByUsername(_accountRegister.phoneNumber);
      if (holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('PhoneNumber is exist'),
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
  private async createAccount(_accountRegister: AccountRegisterDto, isApp: boolean): Promise<unknown> {
    try {
      const salt = bcrypt.genSaltSync(10);
      // Hasd Pw asynchronously
      const HashedPw = await bcrypt.hash(_accountRegister.password, salt);
      // console.log('HashedPw:: ', HashedPw);

      const newAccount = await this._accountRepository.create({
        ..._accountRegister,
        password: HashedPw,
        verified: false,
        verificationExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        loginAttempts: 0,
        blockExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      // console.log('newAccount:: ', newAccount);

      // Generate RSA key pair asynchronously
      const { publicKey, privateKey } = await this._keyTokenService.generateRSAKeyPair();
      // console.log('publicKey:: ', publicKey, 'privateKey:: ', privateKey);

      // create Key Token
      const publicKeyString = await this._keyTokenService.createKeyToken({ accountId: newAccount.id, publicKey });
      // console.log('publicKeyString:: ', publicKeyString);

      // Create token pair
      const tokens = await createTokenPair({ accountId: newAccount.id }, publicKeyString, privateKey);
      // console.log('tokens:: ', tokens);

      await this._accountRepository.save({
        ...newAccount,
        publicKey: publicKeyString.toString(),
        refreshToken: tokens.refreshToken,
        accessToken: tokens.accessToken,
      });
      //return response
      const metadata = { token: tokens.accessToken };
      const res = this._respone.createResponse(200, 'Register success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'REGISTER_FAIL',
      });
    }
  }
}
