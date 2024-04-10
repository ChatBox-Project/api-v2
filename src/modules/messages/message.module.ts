import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from 'src/controllers';
import { entities } from 'src/entities/entity.provider';
import { AccountRepository, ChatBoxRepository, MessageRepository, UserRepository } from 'src/repositories';
import { AppGateWay, MessageService, ResponseService } from 'src/services';
// import { AppGateWayModule } from '../gateway';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, ChatBoxRepository, UserRepository, AccountRepository, ResponseService, AppGateWay],
})
export class MessageModule {}
