import { Body, Controller, Post, Headers, Get, Patch, Put, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import * as _ from 'underscore';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  public async getUserByToken(@Headers() _headers: any) {
    return await this.userService.getUserByToken(_headers.token);
  }

  @Post('')
  @ApiOkResponse({ description: 'Create user' })
  public async create(@Body() createUserDto: any, @Headers() _headers: any) {
    return await this.userService.create(_headers.token, createUserDto);
  }
  @Get(':id')
  @ApiOkResponse({ description: 'Get user by id' })
  public async getUserId(@Param('id') _id: string) {
    return await this.userService.getUserId(_id);
  }

  @Put('')
  @ApiOkResponse({ description: 'Update user' })
  public async update(@Body() updateUserDto: UpdateUserDto, @Headers() _headers: any) {
    return await this.userService.updateUser(_headers.token, updateUserDto);
  }

  @Put('add-friend/:id')
  @ApiOkResponse({ description: 'Add friend' })
  public async addFriend(@Param('id') _id: string, @Headers() _headers: any) {
    return await this.userService.addFriend(_headers.token, _id);
  }
  @Put('acp-friend/:id')
  public async acceptFriend(@Param('id') _id: string, @Headers() _headers: any) {
    
    return await this.userService.acceptFriend(_headers.token, _id);
  }

  @Get('search/:phone')
  @ApiOkResponse({ description: 'Search user by phone' })
  public async search(@Param('phone') phone: string, @Headers() _headers: any) {
    return await this.userService.search(_headers.token, phone);
  }

  @Get('friends/list')
  @ApiOkResponse({ description: 'List friend' })
  public async getListFriends(@Headers() _headers: any) {
    return await this.userService.getListFriends(_headers.token);
  }
}
