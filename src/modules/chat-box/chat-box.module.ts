import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBoxController } from 'src/controllers/';
import { entities } from 'src/entities/entity.provider';
import { ChatBoxService } from 'src/services/';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ChatBoxService],
controllers:[ChatBoxController]
})
export class ChatBoxModule {}
