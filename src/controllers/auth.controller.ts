import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { UserRegisterDto } from 'src/validators/dtos/auth/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  public async login() {
    return this._authService.login();
  }
  @Post('register')
  public async register(
    @Body() _userRegister: UserRegisterDto,
  ): Promise<unknown> {
    return this._authService.register(_userRegister);
  }
}
