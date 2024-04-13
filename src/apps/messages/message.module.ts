import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { entities } from 'src/common/entities/entity.provider';
import { MessageService } from './message.service';
import { ResponseService } from 'src/common/res';
import { ChatBoxService } from '../chat-box/chat-box.service';

// import { AppGateWayModule } from '../gateway';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [MessageController],
  providers: [MessageService, ResponseService, ChatBoxService],
})
export class MessageModule {}
