import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors, Headers } from '@nestjs/common';
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
  // @Post('avatar')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploadedFiles/avatars',
  //     }),
  //   }),
  // )
  // // async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
  //   return this.usersService.addAvatar(request.user.id, {
  //     path: file.path,
  //     filename: file.originalname,
  //     mimetype: file.mimetype,
  //   });
  // }
}
