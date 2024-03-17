import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { entities } from 'src/entities/entity.provider';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
