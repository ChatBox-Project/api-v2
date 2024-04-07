import { Body, Controller, Post, Headers, Put, Param, Patch, Query } from '@nestjs/common';
import { AccountService } from 'src/services';
import { ChangePwDto, ForgotPwDto } from 'src/validators';
import _ from 'underscore';
@Controller('account')
export class AccountController {
  constructor(private readonly _accountSerivce: AccountService) {}
  // after login
  @Put('changepw')
  public async changePassword(@Headers() _headers: any, @Body() pw: ChangePwDto): Promise<unknown> {
    const changePw = await this._accountSerivce.changePassword(_headers, pw);
    return _.omit(changePw, 'password');
  }

  // before login
  @Put('forgotpw')
  public async forgotPassword(@Query() _phone: ForgotPwDto, @Body() pw: ChangePwDto): Promise<unknown> {
    const forgotPw = await this._accountSerivce.forgotPassword(_phone, pw);
    return _.omit(forgotPw, 'password');
  }
}
