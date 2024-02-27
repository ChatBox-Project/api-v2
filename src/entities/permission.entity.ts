import { Column, Entity } from 'typeorm';
import { IPermission } from './interfaces/permission.entity.interface';
import { BaseEntity } from './bases/base.entity';

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity implements IPermission {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  constructor(props?: IPermission) {
    super();
    if (props) {
      this.name = props.name;
    }
    Object.assign(this, props);
  }
}
