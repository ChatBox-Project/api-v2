import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { entities } from 'src/entities/entity.provider';
import { ResponseService } from 'src/services';
import { AccountService } from 'src/services/account/account.service';
import { AuthService } from 'src/services/auth/auth.service';
import { KeyTokenService } from 'src/services/key/keyToken.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AuthController],
  providers: [AuthService, AccountService, KeyTokenService, ResponseService],
  exports: [AuthService],
})
export class AuthModule {}
