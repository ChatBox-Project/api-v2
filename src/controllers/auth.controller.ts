import { Body, Controller, Post, Headers, UsePipes } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { UserRegisterDto } from 'src/validators/dtos/auth/user-register.dto';
import { RegisterSchema } from 'src/validators/joi-schema/auth/register.joi.schema';
import { JoiValidationPipe } from 'src/validators/pipes/joi';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  public async login() {
    return this._authService.login();
  }
  @UsePipes(new JoiValidationPipe(RegisterSchema))
  @Post('register')
  public async register(@Body() _userRegister: UserRegisterDto, @Headers() _headers: any): Promise<unknown> {
    return this._authService.register(_userRegister, _headers);
  }
}
