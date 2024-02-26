import { Column, Index } from 'typeorm';
import { IdEntity } from './id.entity';

export abstract class UserBaseEntity extends IdEntity {
  @Index({ unique: true })
  @Column({ type: 'uuid' })
  userId: string;
}
