import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from 'src/common/entities/entity.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseService } from 'src/common/res';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/models/user.model';
import { UserRepository } from 'src/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), TypeOrmModule.forFeature(entities)],
  controllers: [UserController],
  providers: [UserService, ResponseService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
