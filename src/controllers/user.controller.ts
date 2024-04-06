import { Body, Controller, Post, Headers, Get, Put } from '@nestjs/common';
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
  @Get('get')
  public async getUser(@Headers() _header: any): Promise<unknown> {
    const account = await this._userService.getUser(_header);
    return _.omit(account);
  }

  @Put('update')
  public async updateAccount(@Body() _user: CreateUserDto, @Headers() _header: any): Promise<unknown> {
    const update = await this._userService.updateUser(_user, _header);
    return _.omit(update);
  }
}
