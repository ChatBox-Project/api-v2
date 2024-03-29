import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserDto } from 'src/validators';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('create')
  public async create(@Body() user: CreateUserDto, @Headers() header: any): Promise<unknown> {
    return this._userService.createUser(user, header);
  }
}
