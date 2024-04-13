import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/common/entities/entity.provider';
import { AuthModule } from '../auth/auth.module';
import { KeyModule } from '../auth/keys/key.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ResponseService } from 'src/common/res';


@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule, KeyModule],
  controllers: [AccountController],
  providers: [AccountService, ResponseService],
})
export class AccountModule {}
