import { Module } from '@nestjs/common';

import { DatabaseModule } from './controllers/database/database.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities/entity.provider';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature(entities),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(private dataSourse: DataSource) {}ƒ
}
