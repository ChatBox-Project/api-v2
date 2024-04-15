import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from 'src/common/entities/entity.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseService } from 'src/common/res';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/models/user.model';

@Module({
  imports: [MongooseModule.forFeature()],
  controllers: [UserController],
  providers: [UserService, ResponseService],
})
export class UserModule {}
