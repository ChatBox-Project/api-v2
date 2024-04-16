import { Injectable, Module } from '@nestjs/common';
import { ConversationController } from './converstion.controller';
import { ConversationService } from './conversation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/common/models/conversation.model';
import { ResponseService } from 'src/common/res';
import { User, UserSchema } from 'src/common/models/user.model';
import { ConversationRepository } from 'src/common';
import { Room, RoomChatSchema } from 'src/common/models/room.model';
import { Messages, MessagesSchema } from 'src/common/models/message.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, ResponseService, ConversationRepository],
  exports: [ConversationService],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomChatSchema },
      { name: Messages.name, schema: MessagesSchema },
    ]),
    TypeOrmModule.forFeature([AccountEntity]),
  ],
})
export class ConversationModule {}
