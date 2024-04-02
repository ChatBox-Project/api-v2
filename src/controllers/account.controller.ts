import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { AccountLoginDto, AccountRegisterDto } from 'src/validators';

@Controller('account')
export class AccountController {
  constructor(private readonly _authService: AuthService) {}

  // @Post('login')
  // public async login(@Body() _accountLogin: AccountLoginDto, @Headers() _headers: any): Promise<unknown> {
  //    this._authService.login();
  //    return 
  // }
  @Post('register')
  public async register(@Body() _userRegister: AccountRegisterDto, @Headers() _headers: any): Promise<unknown> {
    return this._authService.register(_userRegister, _headers);
  }
}
