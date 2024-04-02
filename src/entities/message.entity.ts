import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IMessage } from './interfaces/message.entity.interface';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity implements IMessage {
  @Index('IX_Message_MessageId', { unique: true })
  @Column({ name: 'message_id', type: 'uuid' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  messageId: string;

  @Index('IX_Message_Sender_id', { unique: true })
  @Column({ name: 'sender_id', type: 'varchar' })
  @IsNotEmpty()
  senderId: string;

  @Column({ name: 'message_type', type: 'varchar' })
  messageType?: string;

  @Column({ name: 'content_text', type: 'varchar' })
  contentText?: string;

  @Column({ name: 'content_image', type: 'varchar' })
  contentImage?: string;

  @Column({ name: 'content_audio', type: 'varchar' })
  contentAudio?: string;

  @Column({ name: 'content_video', type: 'varchar' })
  contentVideo?: string;

  @Column({ name: 'content_file', type: 'varchar' })
  contentFile?: string;

  @OneToMany(() => ChatBoxEntity, (chat) => chat.message)
  @JoinColumn()
  chatBox?: ChatBoxEntity;

  @OneToMany(() => ChatGroupEntity, (chat) => chat.message)
  @JoinColumn()
  chatGroup?: ChatGroupEntity;
}
