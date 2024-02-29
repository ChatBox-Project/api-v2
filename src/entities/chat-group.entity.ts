import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IChatGroupEntity } from './interfaces/chat-group.entity.interface';
import { UserBaseEntity } from './user.base.entity';
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

  @ManyToMany(() => UserBaseEntity, (user) => user.chatGroup)
  @JoinTable()
  user: UserBaseEntity[];

  @ManyToOne(() => GroupLeaderPermissionEntity, (gr) => gr.group)
  @JoinColumn()
  groupLeaderPermission: GroupLeaderPermissionEntity;

  @ManyToOne(() => MessageEntity, (mess) => mess.chatGroup)
  @JoinColumn()
  message: MessageEntity[];

  constructor(props?: ChatGroupEntity) {
    super();
    if (props) {
      this.groupId = props.groupId;
      this.groupName = props.groupName;
      this.groupMembers = props.groupMembers;
      this.groupLeader = props.groupLeader;
      this.user = props.user;
      this.groupLeaderPermission = props.groupLeaderPermission;
      this.message = props.message;
    }
    Object.assign(this, props);
  }
}
