import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { ErrorResponse } from 'src/errors';
import { AccountRepository } from 'src/repositories';
import { ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseService } from '../res';
import { ChangePwDto, ForgotPwDto } from 'src/validators';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _accountRepository: AccountRepository,
    private readonly _response: ResponseService,
  ) {}

  async getAccountByUsername(phoneNumber: string): Promise<AccountEntity> {
    return await this._accountRepository.findOne({
      where: { phoneNumber: ILike(phoneNumber) },
    });
  }

  public async getAccount(token: string): Promise<unknown> {
    try {
      // check token
      if (!token) {
        throw new ErrorResponse({
          ...new BadRequestException('Invalid token'),
          errorCode: 'INVALID_TOKEN',
        });
      }

      // found account
      const holderAccount = await this._accountRepository.findOne({ where: { accessToken: token } });
      // console.log('holderAccount:: ', holderAccount)
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account not found'),
          errorCode: 'ACCOUNT_NOT_FOUND',
        });
      }

      const metadata = { account: holderAccount };
      return this._response.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'UPDATE_PW_FAIL',
      });
    }
  }
  public async changePassword(token: string, pw: ChangePwDto): Promise<unknown> {
    try {
      // check token
      if (!token) {
        throw new ErrorResponse({
          ...new BadRequestException('Token is not exists'),
          errorCode: 'TOKEN_NOT_EXIST',
        });
      }

      //find account
      const holder = await this._accountRepository.findOne({ where: { accessToken: token } });

      if (!holder) {
        throw new ErrorResponse({
          ...new BadRequestException('Token is not exists'),
          errorCode: 'TOKEN_NOT_EXIST',
        });
      }
      // check password is match
      const isMatch = await bcrypt.compare(pw.pw, holder.password);
      if (isMatch) {
        throw new ErrorResponse({
          ...new BadRequestException('Password is match'),
          errorCode: 'PASSWORD_IS_MATCH',
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pw.pw, salt);
      // change password
      const updatePw = await this._accountRepository.update(holder.id, { password: hashedPassword });
      // console.log(updatePw);
      if (!updatePw) {
        throw new ErrorResponse({
          ...new BadRequestException('Change password fail'),
          errorCode: 'ChangePW_FAIL',
        });
      }
      //res
      const metadata = { token: holder.accessToken };
      const res = this._response.createResponse(200, 'Change password success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'ChangePW_FAIL',
      });
    }
  }

  public async forgotPassword(phoneNumber: ForgotPwDto, pw: ChangePwDto): Promise<unknown> {
    try {
      // find account
      const holderAccount = await this._accountRepository.findOne({ where: { phoneNumber: phoneNumber.phone } });
      console.log(holderAccount);

      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('PhoneNumber is not exist'),
          errorCode: 'PHONENUMBER_NOT_EXIST',
        });
      }
      // change password
      const changePw = await this.changePassword(holderAccount.accessToken, pw);
      console.log(changePw);
      if (!changePw) {
        throw new ErrorResponse({
          ...new BadRequestException('Change password fail'),
          errorCode: 'ChangePW_FAIL',
        });
      }
      return changePw;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'UPDATE_PW_FAIL',
      });
    }
  }
}
