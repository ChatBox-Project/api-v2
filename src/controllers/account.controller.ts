import { Body, Controller, Post, Headers, Put } from '@nestjs/common';
import { AccountService } from 'src/services';
import { changePwDto, ForgotPwDto } from 'src/validators';
import _ from 'underscore';
@Controller('account')
export class AccountController {
  constructor(private readonly _accountSerivce: AccountService) {}

  @Put('changepw')
  public async changePassword(@Headers() _headers: any, @Body() pw: changePwDto): Promise<unknown> {
    const changePw = await this._accountSerivce.changePassword(_headers, pw);
    return _.omit(changePw, 'password');
  }

  @Put('forgotpw')
  public async forgotPassword(@Body() phoneNumber: ForgotPwDto): Promise<unknown> {
    const forgotPw = await this._accountSerivce.forgotPassword(phoneNumber);
    return _.omit(forgotPw, 'password');
  }
}
