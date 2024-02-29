import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces/group-leader-permission.entity.interface';
import { UserBaseEntity } from './user.base.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'group-leader-permission' })
export class GroupLeaderPermission
  extends BaseEntity
  implements IGroupLeaderPermission
{
  @Index('IX_GroupLeaderPermission_GroupLeaderPermissionId', { unique: true })
  @Column({ name: 'group_leader_permission_id', type: 'varchar', length: 255 })
  group_leader_permissionId?: string;

  @OneToMany(() => UserBaseEntity, (user) => user.groupLeaderPermissionId)
  @JoinColumn()
  leaderId?: UserBaseEntity;

  @OneToMany(() => ChatGroupEntity, (chatGroup) => chatGroup.groupId)
  @JoinColumn()
  groupId?: string | ChatGroupEntity[];

  @OneToOne(() => PermissionEntity)
  @JoinColumn()
  permissionId: PermissionEntity;

  constructor(props?: GroupLeaderPermission) {
    super();
    if (props) {
      this.group_leader_permissionId = props.group_leader_permissionId;
      this.leaderId = props.leaderId;
      this.groupId = props.groupId;
      this.permissionId = props.permissionId;
    }
    Object.assign(this, props);
  }
}
