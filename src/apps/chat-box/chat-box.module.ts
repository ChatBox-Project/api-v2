import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from 'src/common/entities/entity.provider';
import { ChatBoxService } from './chat-box.service';
import { ResponseService } from 'src/common/res';
import { MessageService } from '../messages/message.service';
import { ChatBoxController } from './chat-box.controller';
// import { GatewayModule } from '../gateways/gateway.module';


@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ChatBoxService, ResponseService, MessageService],
  controllers: [ChatBoxController],
  exports: [ChatBoxService],
})
export class ChatBoxModule {}
