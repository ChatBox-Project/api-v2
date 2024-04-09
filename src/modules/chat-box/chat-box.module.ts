import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBoxController } from 'src/controllers/';
import { ChatBoxService, MessageService, ResponseService } from 'src/services/';
import { entities } from 'src/entities/entity.provider';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  providers: [ChatBoxService, ResponseService, MessageService],
  controllers: [ChatBoxController],
})
export class ChatBoxModule {}
