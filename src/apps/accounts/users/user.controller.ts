import { Body, Controller, Post, Headers, Get, Patch, Put, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import * as _ from 'underscore';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiOkResponse({ description: 'Create user' })
  @Post()
  public async create(@Body() _user: CreateUserDto, @Headers() _header: any): Promise<unknown> {
    const create = await this._userService.createUser(_user, _header.token);
    return _.omit(create);
  }
  @ApiOkResponse({ description: 'Get user' })
  @Get()
  public async getUser(@Headers() _header: any): Promise<unknown> {
    const account = await this._userService.getUser(_header.token);
    return _.omit(account);
  }

  @ApiOkResponse({ description: 'Update user' })
  @Patch()
  public async updateUser(@Body() _userUpdate: any, @Headers() _header: any): Promise<unknown> {
    const update = await this._userService.updateUser(_userUpdate, _header);
    return _.omit(update);
  }
  @Get(':id')
  @ApiOkResponse({ description: 'Get user' })
  public async getUserById(@Headers() _header: any, @Param('id') _id: string): Promise<unknown> {
    const user = await this._userService.getUserById(_header.token, _id);
    return _.omit(user);
  }
  @Put('friends/:id')
  public async addFriend(@Headers() _header: any, @Param('id') friendId: string): Promise<unknown> {
    const addFriend = await this._userService.addFriend(_header.token, friendId);
    console.log('addFriend', friendId);
    return;
  }
}
