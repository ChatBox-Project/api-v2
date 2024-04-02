import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers';
import { entities } from 'src/entities/entity.provider';
import { AuthService, ResponseService, UserService } from 'src/services';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
  controllers: [UserController],
  providers: [UserService, ResponseService],
})
export class UserModule {}
