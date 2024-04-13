import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/common/entities/entity.provider';
import { KeyTokenService } from 'src/apps/auth/keys/keyToken.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [KeyTokenService],
})
export class KeyModule {}
