import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpController } from 'src/controllers/otp.controller';
import { entities } from 'src/entities/entity.provider';
import { OtpService, ResponseService } from 'src/services';

import { AccountRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [OtpController],
  providers: [OtpService, AccountRepository, ResponseService],
})
export class OtpModule {}
