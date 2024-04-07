import { Body, Controller, Post, Headers, Put, Param, Patch } from '@nestjs/common';
import { AccountService } from 'src/services';
import { changePwDto, ForgotPwDto } from 'src/validators';
import _ from 'underscore';
@Controller('account')
export class AccountController {
  constructor(private readonly _accountSerivce: AccountService) {}
  // after login
  @Put('changepw')
  public async changePassword(@Headers() _headers: any, @Body() pw: changePwDto): Promise<unknown> {
    const changePw = await this._accountSerivce.changePassword(_headers, pw);
    return _.omit(changePw, 'password');
  }

  // before login
  @Patch('forgotpw')
  public async forgotPassword(@Headers() _headers: any, @Body() pw: ForgotPwDto) {
    console.log(_headers.phone, pw.phoneNumber);
    // const forgotPw = await this._accountSerivce.forgotPassword(_headers.phone, pw.phoneNumber);
    // return _.omit(forgotPw, 'password');
  }
}
