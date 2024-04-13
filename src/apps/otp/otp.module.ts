import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpController } from 'src/apps/otp/otp.controller';
import { entities } from 'src/common/entities/entity.provider';



import { OtpService } from './otp.service';
import { ResponseService } from 'src/common/res';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [OtpController],
  providers: [OtpService, AccountRepository, ResponseService],
})
export class OtpModule {}
