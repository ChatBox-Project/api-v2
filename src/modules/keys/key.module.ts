import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entities/entity.provider';
import { KeyTokenService } from 'src/services/key/keyToken.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [KeyTokenService],
})
export class KeyModule {}
