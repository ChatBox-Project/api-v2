import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors, Headers, Get, Put } from '@nestjs/common';
import { UserService } from 'src/services';
import { CreateUserDto } from 'src/validators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  public async getAccount(@Headers() _header: any): Promise<unknown> {
    const account = await this._userService.getAccount(_header);
    return _.omit(account);
  }

  @Put('update')
  public async updateAccount(@Body() _user: CreateUserDto, @Headers() _header: any): Promise<unknown> {
    return;
  }
}
