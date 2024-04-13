import { Body, Controller, Post, Headers, UsePipes } from '@nestjs/common';
import { AuthService } from 'src/apps/auth/auth.service';


import { RegisterSchema } from 'src/validators/joi-schema/auth/register.joi.schema';
import { JoiValidationPipe } from 'src/validators/pipes/joi';
import _ from 'underscore';
import { AccountLoginDto, AccountRegisterDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  public async login(@Body() _req: AccountLoginDto, @Headers() _headers: any) {
    const login = await this._authService.login(_req, _headers);
    return _.omit(login, 'password');
  }
  @UsePipes(new JoiValidationPipe(RegisterSchema))
  @Post('register')
  public async register(@Body() _userRegister: AccountRegisterDto, @Headers() _headers: any): Promise<unknown> {
    const register = await this._authService.register(_userRegister, _headers);
    return _.omit(register, 'password');
  }
}
