import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities/entity.provider';
import { DatabaseModule } from './module/database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(private dataSourse: DataSource) {}ƒ
}
