import { IChatBoxEntity } from './interfaces/chat-box.entity.interface';
import { BaseEntity } from './bases/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.base.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity implements IChatBoxEntity {
  @Index('IX_ChatBox_ChatBoxId', { unique: true })
  @Column({ name: 'chat_box_id', type: 'uuid' })
  @PrimaryGeneratedColumn()
  chatBoxId: string;

  @Index('IX_ChatBox_ChatBoxName', { unique: true })
  @Column({ name: 'chat_box_name', type: 'varchar' })
  chatBoxName: string;

  @OneToMany(() => UserEntity, (user) => user.chatBox)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => MessageEntity, (mess) => mess.chatBox)
  @JoinColumn()
  message?: MessageEntity;
}
