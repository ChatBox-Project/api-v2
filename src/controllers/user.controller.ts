import { Body, Controller, Post, Headers, Get, Patch } from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserDto, UpdateUserDto } from 'src/validators';
import * as _ from 'underscore';
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  public async create(@Body() _user: CreateUserDto, @Headers() _header: any): Promise<unknown> {
    const create = await this._userService.createUser(_user, _header);
    return _.omit(create);
  }
  @Get()
  public async getUser(@Headers() _header: any): Promise<unknown> {
    const account = await this._userService.getUser(_header.token);
    return _.omit(account);
  }
  @Patch()
  public async updateUser(@Body() _userUpdate: any, @Headers() _header: any): Promise<unknown> {
    const update = await this._userService.updateUser(_userUpdate, _header);
    return _.omit(update);
  }
}
