import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { UserRegisterDto } from 'src/validators/dtos/auth/account-register.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  public async login() {
    return this._authService.login();
  }
  @Post('register')
  public async register(
    @Body() _userRegister: UserRegisterDto,
    @Headers() _headers: any,
  ): Promise<unknown> {
    return this._authService.register(_userRegister, _headers);
  }
}
