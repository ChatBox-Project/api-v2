import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './controllers/database/database.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities/entity.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private dataSourse: DataSource) {}ƒ
}
