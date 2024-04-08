import { IChatBoxEntity } from './interfaces/chat-box.entity.interface';
import { BaseEntity } from './bases/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.base.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity implements IChatBoxEntity {

  @Column({ name: 'chat_box_name', type: 'varchar' })
  chatBoxName: string;

  @Index('IX_SENDER_ID')
  @Column({ name: 'sender_id', type: 'uuid' })
  sender_id: string;

  @Index('IX_RECEIVER_ID')
  @Column({ name: 'receiver_id', type: 'uuid' })
  receiver_id: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity[];

  @ManyToOne(() => MessageEntity, (mess) => mess.chatBox)
  message?: MessageEntity[] | MessageEntity;
}
