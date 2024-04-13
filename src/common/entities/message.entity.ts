import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IMessage } from './interfaces/message.entity.interface';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity implements IMessage {
  @Index('IX_Message_MessageId')
  @Column({ name: 'message_id', type: 'uuid' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  messageId: string;

  @Column({ name: 'sender_id', type: 'varchar' })
  senderId: string;

  @Column({ name: 'receiver_id', type: 'varchar' })
  receiverId: string;

  @Column({ name: 'message_type', type: 'varchar' })
  messageType: string;

  @Column({ name: 'content_text', type: 'varchar' })
  contentMessage: string;

  @ManyToOne(() => ChatBoxEntity, (chat) => chat.message)
  @JoinColumn()
  chatBox: ChatBoxEntity;


  // @OneToMany(() => ChatGroupEntity, (chat) => chat.message)
  // @JoinColumn()
  // chatGroup?: ChatGroupEntity[];
}
