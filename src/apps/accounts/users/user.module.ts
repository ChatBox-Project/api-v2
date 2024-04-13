import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from 'src/common/entities/entity.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseService } from 'src/common/res';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserController],
  providers: [UserService, ResponseService],
})
export class UserModule {}
