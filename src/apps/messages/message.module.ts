import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { entities } from 'src/common/entities/entity.provider';
import { MessageService } from './message.service';
import { ResponseService } from 'src/common/res';
import { MongooseModule } from '@nestjs/mongoose';
import { Messages, MessagesSchema } from 'src/common/models/message.model';
import { MessagesRepository } from 'src/common';

@Module({
  imports: [TypeOrmModule.forFeature(entities), MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }])],
  controllers: [MessageController],
  providers: [MessageService, ResponseService, MessagesRepository],
})
export class MessageModule {}
