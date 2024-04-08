import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from 'src/controllers';
import { entities } from 'src/entities/entity.provider';
import { AppGateWay, MessageService } from 'src/services';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [MessageController],
  providers: [MessageService, AppGateWay],
})
export class MessageModule {}
