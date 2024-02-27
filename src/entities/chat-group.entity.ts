import { Column, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IChatGroupEntity } from './interfaces/chat-group.entity.interface';

export class ChatGroupEntity extends BaseEntity implements IChatGroupEntity {
  @Index('IX_ChatGroupEntity_GroupId')
  @Column({ type: 'uuid', nullable: true })
  groupId: string;
  @Index('IX_ChatGroupEntity_ChatBoxId')
  @Column({ type: 'uuid', nullable: true })
  chatBoxId: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  groupName?: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  groupMembers?: string[];

  @Index('IX_ChatGroupEntity_GroupLeaderId')
  @Column({ type: 'uuid', nullable: true })
  groupLeaderId: string;

  constructor(props?: IChatGroupEntity) {
    super();
    if (props) {
      this.groupId = props.groupId;
      this.chatBoxId = props.chatBoxId;
      this.groupName = props.groupName;
      this.groupMembers = props.groupMembers;
      this.groupLeaderId = props.groupLeaderId;
    }
    Object.assign(this, props);
  }
}
