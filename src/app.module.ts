import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresDatabaseModule } from './common/database/postgres/postgres.database.module';
import { LoggerMiddleware } from './middlewares/app.middleware';
import { AuthModule } from './apps/auth/auth.module';
import { KeyModule } from './apps/auth/keys/key.module';
import { UserModule } from './apps/accounts/users/user.module';
import { OtpModule } from './apps/otp/otp.module';
import { AccountModule } from './apps/accounts/account.module';
import { MessageModule } from './apps/messages/message.module';

import { MongooseDatabaseModule } from './common/database/mongooses/mongoose.database.module';
import { ConversationModule } from './apps/conversations/conversation.module';
import { ResponseService } from './common/res';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './common/models/user.model';
import { Conversation, ConversationSchema } from './common/models/conversation.model';
import { Room, RoomChatSchema } from './common/models/room.model';
import { Messages } from './common/models/message.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    KeyModule,
    UserModule,
    OtpModule,
    AccountModule,
    MessageModule,
    ConversationModule,
    PostgresDatabaseModule,
    MongooseDatabaseModule,
  ],
  controllers: [],
  providers: [ResponseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
