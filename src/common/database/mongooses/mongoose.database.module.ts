import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/common/models/conversation.model';
import { Messages, MessagesSchema } from 'src/common/models/message.model';
import { Room, RoomChatSchema } from 'src/common/models/room.model';

import { User, UserSchema } from 'src/common/models/user.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.n5xhbw0.mongodb.net/messages', {}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
      { name: Room.name, schema: RoomChatSchema },
      { name: Messages.name, schema: MessagesSchema },
    ]),
  ],
})
export class MongooseDatabaseModule {}
