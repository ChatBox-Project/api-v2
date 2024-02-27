import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces/group-leader-permission.entity.interface';

@Entity({ name: 'group-leader-permission' })
export class GroupLeaderPermission
  extends BaseEntity
  implements IGroupLeaderPermission
{
  @Index('IX_GROUP_LEADER_PERMISSION_GROUP_ID', { unique: false })
  @Column({ type: 'uuid', nullable: true })
  groupId?: string;

  @Index('IX_GROUP_LEADER_PERMISSION_LEADER_ID', { unique: false })
  @Column({ type: 'uuid', nullable: true })
  leaderId?: string;

  @Index('IX_GROUP_LEADER_PERMISSION_PERMISSION_ID', { unique: false })
  @Column({ type: 'uuid', nullable: true })
  permissionId?: string;

  @Index('IX_GROUP_LEADER_PERMISSION_GROUP_LEADER_PERMISSION_ID', {
    unique: false,
  })
  @Column({ type: 'uuid', nullable: true })
  group_leader_permissionId?: string;

  constructor(props?: IGroupLeaderPermission) {
    super();
    if (props) {
      this.groupId = props.groupId;
      this.leaderId = props.leaderId;
      this.permissionId = props.permissionId;
      this.group_leader_permissionId = props.group_leader_permissionId;
    }
    Object.assign(this, props);
  }
}
