import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities/entity.provider';
import { DatabaseModule } from './module/database/database.module';
import { ChatGateway } from './chat.gateway';
import { AppMiddleware } from './middlewares/app.middleware';
import { AuthModule } from './module/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
