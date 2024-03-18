import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { entities } from 'src/entities/entity.provider';
import { AuthService } from 'src/services/auth/auth.service';
import { AccountService } from 'src/services/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AuthController],
  providers: [AuthService, AccountService],
})
export class AuthModule {}
