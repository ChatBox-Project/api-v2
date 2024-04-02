import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserDto } from 'src/validators';
import * as _ from 'underscore';
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('create')
  public async create(@Body() user: CreateUserDto, @Headers() header: any): Promise<unknown> {
    const create = await this._userService.create(user, header);
    return _.omit(user, 'password');
  }
}
