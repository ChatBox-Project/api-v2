import { IChatBoxEntity } from './interfaces/chat-box.entity.interface';
import { BaseEntity } from './bases/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity implements IChatBoxEntity {
  @Index('IX_ChatBoxEntity_UserId')
  @Column({ type: 'uuid' })
  userId: string[];

  @Index('IX_ChatBoxEntity_ChatBoxId')
  @Column({ type: 'uuid' })
  chatBoxId: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  chatBoxName: string;

  constructor(props?: IChatBoxEntity) {
    super();
    if (props) {
      this.userId = props.userId;
      this.chatBoxId = props.chatBoxId;
      this.chatBoxName = props.chatBoxName;
    }
    Object.assign(this, props);
  }
}
