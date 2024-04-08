import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBoxController } from 'src/controllers/';
import { ChatBoxService, ResponseService } from 'src/services/';
import { entities } from 'src/entities/entity.provider';
import { UserRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  providers: [ChatBoxService, ResponseService],
  controllers: [ChatBoxController],
})
export class ChatBoxModule {}
