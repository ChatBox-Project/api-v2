import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/entity.provider';
import { AuthModule } from '../auth';
import { AccountController } from 'src/controllers/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities), AuthModule],
  controllers: [AccountController],
})
export class AccountModule {}
