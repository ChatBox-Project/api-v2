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
import { ChatBoxModule } from './apps/chat-box/chat-box.module';
// import { GatewayModule } from './apps/gateways/gateway.module';
import { ChatGroupModule } from './apps/chat-groups';
import { MongooseDatabaseModule } from './common/database/mongooses/mongoose.database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // GatewayModule,
    AuthModule,
    KeyModule,
    UserModule,
    OtpModule,
    AccountModule,
    MessageModule,
    ChatBoxModule,
    ChatGroupModule,
    PostgresDatabaseModule,
    MongooseDatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
