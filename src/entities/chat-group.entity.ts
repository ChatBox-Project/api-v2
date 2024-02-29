import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IChatGroupEntity } from './interfaces/chat-group.entity.interface';
import { UserBaseEntity } from './user.base.entity';
import { GroupLeaderPermission } from './group-leader-permission.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'chat-group' })
export class ChatGroupEntity extends BaseEntity implements IChatGroupEntity {
  @Index('IX_ChatGroup_GroupId', { unique: true })
  @Column({ name: 'group_id', type: 'varchar', length: 255 })
  groupId?: string;
  @Index('IX_ChatGroup_ChatBoxId', { unique: true })
  @Column({ name: 'chat_box_id', type: 'varchar', length: 255 })
  chatBoxId?: string;
  @Index('IX_ChatGroup_GroupName', { unique: true })
  @Column({ name: 'group_name', type: 'varchar', length: 255 })
  groupName?: string;
  @Column({ name: 'group_members', type: 'varchar', length: 255, array: true })
  groupMembers?: string[];
  @Column({ name: 'group_leader_id', type: 'varchar', length: 255 })
  groupLeaderId: string;

  @ManyToMany(() => UserBaseEntity, (user) => user.chatGroupId)
  @JoinTable()
  userId: UserBaseEntity[];

  @ManyToOne(() => GroupLeaderPermission, (gr) => gr.groupId)
  @JoinColumn()
  groupLeaderPermissionId: GroupLeaderPermission;

  @ManyToOne(() => MessageEntity, (mess) => mess.chatGroupId)
  @JoinColumn()
  messageId?: MessageEntity;

  constructor(props?: ChatGroupEntity) {
    super();
    if (props) {
      this.groupId = props.groupId;
      this.chatBoxId = props.chatBoxId;
      this.groupName = props.groupName;
      this.groupMembers = props.groupMembers;
      this.groupLeaderId = props.groupLeaderId;
      this.userId = props.userId;
      this.groupLeaderPermissionId = props.groupLeaderPermissionId;
    }
    Object.assign(this, props);
  }
}
