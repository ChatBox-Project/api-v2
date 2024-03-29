import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/entity.provider';
import { AuthModule } from '../auth';
import { AccountController } from 'src/controllers/account.controller';
import { KeyModule } from '../keys';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule, KeyModule],
  controllers: [AccountController],
})
export class AccountModule {}
