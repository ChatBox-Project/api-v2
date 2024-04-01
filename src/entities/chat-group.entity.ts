import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IChatGroupEntity } from './interfaces/chat-group.entity.interface';
import { UserEntity } from './user.base.entity';
import { MessageEntity } from './message.entity';
import { GroupLeaderPermissionEntity } from './group-leader-permission.entity';

@Entity({ name: 'chat-group' })
export class ChatGroupEntity extends BaseEntity implements IChatGroupEntity {
  @Index('IX_ChatGroup_GroupId', { unique: true })
  @Column({ name: 'group_id', type: 'uuid', length: 255 })
  @PrimaryGeneratedColumn()
  groupId: string;

  @Index('IX_ChatGroup_GroupName', { unique: true })
  @Column({ name: 'group_name', type: 'varchar', length: 255 })
  groupName: string;

  @Column({ name: 'group_members', type: 'varchar', length: 255, array: true })
  groupMembers?: string[];

  @Column({ name: 'group_leader_id', type: 'varchar', length: 255 })
  groupLeader: string;

  @ManyToMany(() => UserEntity, (user) => user.chatGroup)
  @JoinTable()
  user: UserEntity[];

  @ManyToOne(() => GroupLeaderPermissionEntity, (gr) => gr.group)
  @JoinColumn()
  groupLeaderPermission: GroupLeaderPermissionEntity;

  @ManyToOne(() => MessageEntity, (mess) => mess.chatGroup)
  @JoinColumn()
  message: MessageEntity[];
}
