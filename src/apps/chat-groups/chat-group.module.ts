import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGroupEntity, entities } from 'src/common/entities';
import { ChatGroupController } from './chat-group.controller';
import { ChatGroupService } from './chat-group.service';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class ChatGroupModule {}
