import { IChatBoxEntity } from './interfaces/chat-box.entity.interface';
import { BaseEntity } from './bases/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBaseEntity } from './user.base.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity implements IChatBoxEntity {
  @Index('IX_ChatBox_ChatBoxId', { unique: true })
  @Column({ name: 'chat_box_id', type: 'uuid', length: 255 })
  @PrimaryGeneratedColumn()
  chatBoxId: string;

  @Index('IX_ChatBox_ChatBoxName', { unique: true })
  @Column({ name: 'chat_box_name', type: 'varchar', length: 255 })
  chatBoxName: string;

  @OneToMany(() => UserBaseEntity, (user) => user.chatBox)
  @JoinColumn()
  user: UserBaseEntity;

  @ManyToOne(() => MessageEntity, (mess) => mess.chatBox)
  @JoinColumn()
  message?: MessageEntity;

  constructor(props?: ChatBoxEntity) {
    super();
    if (props) {
      this.chatBoxId = props.chatBoxId;
      this.chatBoxName = props.chatBoxName;
      this.user = props.user;
    }
    Object.assign(this, props);
  }
}
