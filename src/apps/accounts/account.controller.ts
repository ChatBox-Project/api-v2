import { Body, Controller, Post, Headers, Put, Param, Patch, Query, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import _ from 'underscore';
import { AccountService } from './account.service';
import { ChangePwDto, ForgotPwDto } from './dto';

@Controller('account')
export class AccountController {
  constructor(private readonly _accountSerivce: AccountService) {}
  // after login
  @Put('changepw')
  @ApiOkResponse({ description: 'Change password' })
  public async changePassword(@Headers() _headers: any, @Body() pw: ChangePwDto): Promise<unknown> {
    const changePw = await this._accountSerivce.changePassword(_headers.token, pw);
    return _.omit(changePw, 'password');
  }

  // before login
  @Put('forgotpw')
  @ApiOkResponse({ description: 'Forgot password' })
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
