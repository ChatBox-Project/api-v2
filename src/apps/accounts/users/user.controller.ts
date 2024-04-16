import { Body, Controller, Post, Headers, Get, Patch, Put, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import * as _ from 'underscore';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ description: 'Create user' })
  public async create(@Body() createUserDto: any, @Headers() _headers: any) {
    console.log('createUserDto', createUserDto)
    return await this.userService.create(_headers.token, createUserDto);
  }
  @Get()
  @ApiOkResponse({ description: 'Get user' })
  public async getUserId(@Headers() _header: any) {
    return await this.userService.getUserId(_header.token);
  }
  @Put()
  @ApiOkResponse({ description: 'Update user' })
  public async update(@Body() updateUserDto: UpdateUserDto, @Headers() _headers: any) {
    return await this.userService.updateUser(_headers.token, updateUserDto);
  }
}
