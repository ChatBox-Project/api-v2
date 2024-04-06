import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { ErrorResponse } from 'src/errors';
import { AccountRepository } from 'src/repositories';
import { ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseService } from '../res';
import { changePwDto, ForgotPwDto } from 'src/validators';

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

  public async changePassword(_headers: any, pw: changePwDto): Promise<unknown> {
    try {
      // check token
      if (!_headers?.token) {
        throw new ErrorResponse({
          ...new BadRequestException('Token is not exists'),
          errorCode: 'TOKEN_NOT_EXIST',
        });
      }

      //find account
      const holder = await this._accountRepository.findOne({ where: { accessToken: _headers.token } });

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
      console.log(updatePw);
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

    return;
  }

  public async forgotPassword(phoneNumber: ForgotPwDto): Promise<unknown> {
    return;
  }
}
