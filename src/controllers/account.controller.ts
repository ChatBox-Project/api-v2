import { Body, Controller, Post, Headers, Put, Param, Patch, Query, Get } from '@nestjs/common';
import { AccountService } from 'src/services';
import { ChangePwDto, ForgotPwDto } from 'src/validators';
import _ from 'underscore';
@Controller('account')
export class AccountController {
  constructor(private readonly _accountSerivce: AccountService) {}
  // after login
  @Put('changepw')
  public async changePassword(@Headers() _headers: any, @Body() pw: ChangePwDto): Promise<unknown> {
    const changePw = await this._accountSerivce.changePassword(_headers.token, pw);
    return _.omit(changePw, 'password');
  }

  // before login
  @Put('forgotpw')
  public async forgotPassword(@Query() _phone: ForgotPwDto, @Body() pw: ChangePwDto): Promise<unknown> {
    const forgotPw = await this._accountSerivce.forgotPassword(_phone, pw);
    return _.omit(forgotPw, 'password');
  }
  @Get()
  public async getAccount(@Headers() _header: any): Promise<unknown> {
    const account = await this._accountSerivce.getAccount(_header.token);
    return _.omit(account);
  }
}
