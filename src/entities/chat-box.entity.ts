import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.base.entity';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity {
  @Column({ name: 'chat_box_name', type: 'varchar' })
  chatBoxName: string;

  @Index('IX_SENDER_ID')
  @Column({ name: 'sender_id', type: 'uuid' })
  sender_id: string;

  @Index('IX_RECEIVER_ID')
  @Column({ name: 'receiver_id', type: 'uuid' })
  receiver_id: string;

  @ManyToMany(() => UserEntity)
  user: UserEntity[];

  @JoinTable()
  @OneToMany(() => MessageEntity, (mess) => mess.chatBox)
  message: MessageEntity[];
}
