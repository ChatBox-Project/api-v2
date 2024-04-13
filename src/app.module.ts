import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './common/entities/entity.provider';
import { DatabaseModule } from './common/database/database.module';
import { LoggerMiddleware } from './middlewares/app.middleware';
import { AuthModule } from './apps/auth/auth.module';
import { KeyModule } from './apps/auth/keys/key.module';
import { UserModule } from './apps/accounts/users/user.module';
import { OtpModule } from './apps/otp/otp.module';
import { AccountModule } from './apps/accounts/account.module';
import { MessageModule } from './apps/messages/message.module';
import { ChatBoxModule } from './apps/chat-box/chat-box.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    KeyModule,
    UserModule,
    OtpModule,
    AccountModule,
    MessageModule,
    ChatBoxModule,
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
