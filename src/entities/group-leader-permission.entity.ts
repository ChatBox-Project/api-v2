import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces/group-leader-permission.entity.interface';
import { UserEntity } from './user.base.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'group-leader-permission' })
export class GroupLeaderPermissionEntity extends BaseEntity implements IGroupLeaderPermission {
  @Index('IX_GroupLeaderPermission_GroupLeaderPermissionId', { unique: true })
  @Column({ name: 'group_leader_permission_id', type: 'uuid', length: 255 })
  @PrimaryGeneratedColumn()
  group_leader_permissionId: string;

  @OneToMany(() => UserEntity, (user) => user.groupLeaderPermission)
  @JoinColumn()
  leaderId: UserEntity;

  @OneToMany(() => ChatGroupEntity, (chatGroup) => chatGroup.groupId)
  @JoinColumn()
  group: string | ChatGroupEntity[];

  @OneToOne(() => PermissionEntity)
  @JoinColumn()
  permission: PermissionEntity;
}
