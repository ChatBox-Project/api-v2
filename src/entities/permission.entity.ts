import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IPermission } from './interfaces/permission.entity.interface';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces';
import { IsNotEmpty } from 'class-validator';
import { GroupLeaderPermission } from './group-leader-permission.entity';

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity implements IPermission {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;

  @OneToOne(() => GroupLeaderPermission, (gr) => gr.group_leader_permissionId)
  @JoinColumn()
  groupLeaderPermissionId: IGroupLeaderPermission[];

  constructor(props?: PermissionEntity) {
    super();
    if (props) {
      this.name = props.name;
      this.groupLeaderPermissionId = props.groupLeaderPermissionId;
    }
    Object.assign(this, props);
  }
}
