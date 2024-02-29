import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces/group-leader-permission.entity.interface';
import { UserBaseEntity } from './user.base.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'group-leader-permission' })
export class GroupLeaderPermissionEntity
  extends BaseEntity
  implements IGroupLeaderPermission
{
  @Index('IX_GroupLeaderPermission_GroupLeaderPermissionId', { unique: true })
  @Column({ name: 'group_leader_permission_id', type: 'uuid', length: 255 })
  @PrimaryGeneratedColumn()
  group_leader_permissionId: string;

  @OneToMany(() => UserBaseEntity, (user) => user.groupLeaderPermission)
  @JoinColumn()
  leaderId: UserBaseEntity;

  @OneToMany(() => ChatGroupEntity, (chatGroup) => chatGroup.groupId)
  @JoinColumn()
  group: string | ChatGroupEntity[];

  @OneToOne(() => PermissionEntity)
  @JoinColumn()
  permission: PermissionEntity;

  constructor(props?: GroupLeaderPermissionEntity) {
    super();
    if (props) {
      this.group_leader_permissionId = props.group_leader_permissionId;
      this.leaderId = props.leaderId;
      this.group = props.group;
      this.permission = props.permission;
    }
    Object.assign(this, props);
  }
}
