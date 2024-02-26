import { Column } from 'typeorm';
import { IdEntity } from './id.entity';
import { IBaseEntity } from '../interfaces/base.entity.interface';

export abstract class BaseEntity extends IdEntity {
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isArchieved: boolean;

  @Column({ type: 'varchar', length: 300 })
  createBy: string;

  @Column({ type: 'varchar', length: 300 })
  lastChangedBy: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment: string | null;

  constructor(props?: IBaseEntity) {
    super();
    if (props) {
      this.isActive = props.isActive;
      this.isArchieved = props.isArchieved;
      this.createBy = props.createBy;
      this.lastChangedBy = props.lastChangedBy;
      this.internalComment = props.internalComment;
    }
    Object.assign(this, props);
  }
}
