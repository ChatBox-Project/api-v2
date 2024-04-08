import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities/entity.provider';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerMiddleware } from './middlewares/app.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule, KeyModule, MessageModule, UserModule } from './modules';
import { OtpModule } from './modules/otp';
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
