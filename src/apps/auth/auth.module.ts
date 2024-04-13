import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/apps/auth/auth.controller';
import { entities } from 'src/common/entities/entity.provider';

import { AccountService } from 'src/apps/accounts/account.service';
import { AuthService } from 'src/apps/auth/auth.service';
import { KeyTokenService } from 'src/apps/auth/keys/keyToken.service';
import { ResponseService } from 'src/common/res';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AuthController],
  providers: [AuthService, AccountService, KeyTokenService, ResponseService],
  exports: [AuthService],
})
export class AuthModule {}
