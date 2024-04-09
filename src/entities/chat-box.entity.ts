import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.base.entity';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity {
  @Column({ name: 'chat_box_id', type: 'uuid' })
  @PrimaryGeneratedColumn()
  chatBoxId: string;
  
  @Column({ name: 'chat_box_name', type: 'varchar' })
  chatBoxName: string;

  @Index('IX_SENDER_ID')
  @Column({ name: 'sender_id', type: 'uuid' })
  user1_id: string;

  @Index('IX_RECEIVER_ID')
  @Column({ name: 'receiver_id', type: 'uuid' })
  user2_id: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => MessageEntity, (mess) => mess.chatBox)
  message: MessageEntity[];
}
