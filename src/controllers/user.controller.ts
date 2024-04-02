import { Body, Controller, Post, Headers, Param } from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserDto } from 'src/validators';
import * as _ from 'underscore';
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('create')
  public async create(@Body() _user: CreateUserDto, @Headers() _header: any): Promise<unknown> {
    const create = await this._userService.createUser(_user, _header);
    return _.omit(create);
  }
}
