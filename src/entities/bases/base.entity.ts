import { Column } from 'typeorm';
import { IdEntity } from './id.entity';
import { IBaseEntity } from '../interfaces/base.entity.interface';

export abstract class BaseEntity extends IdEntity {
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchieved: boolean;

  @Column({ type: 'varchar', default: '' })
  createBy: string;

  @Column({ type: 'varchar', default: '' })
  lastChangedBy: string;

  @Column({ type: 'varchar', default: '' })
  internalComment: string | null;
}
