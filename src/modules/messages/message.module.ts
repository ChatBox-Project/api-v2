import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from 'src/controllers';
import { entities } from 'src/entities/entity.provider';
import { AppGateWay, ChatBoxService, MessageService, ResponseService } from 'src/services';
// import { AppGateWayModule } from '../gateway';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [MessageController],
  providers: [MessageService, AppGateWay, ResponseService, ChatBoxService],
})
export class MessageModule {}
