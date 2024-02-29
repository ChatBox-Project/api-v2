import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IMessage } from './interfaces/message.entity.interface';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity implements IMessage {
  @Index('IX_Message_MessageId', { unique: true })
  @Column({ name: 'message_id', type: 'uuid', length: 255 })
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  messageId: string;

  @Index('IX_Message_Sender_id', { unique: true })
  @Column({ name: 'sender_id', type: 'varchar', length: 255 })
  @IsNotEmpty()
  senderId: string;

  @Column({ name: 'message_type', type: 'varchar', length: 255 })
  messageType?: string;

  @Column({ name: 'content_text', type: 'varchar', length: 255 })
  contentText?: string;

  @Column({ name: 'content_image', type: 'varchar', length: 255 })
  contentImage?: string;

  @Column({ name: 'content_audio', type: 'varchar', length: 255 })
  contentAudio?: string;

  @Column({ name: 'content_video', type: 'varchar', length: 255 })
  contentVideo?: string;

  @Column({ name: 'content_file', type: 'varchar', length: 255 })
  contentFile?: string;

  @OneToMany(() => ChatBoxEntity, (chat) => chat.message)
  @JoinColumn()
  chatBox?: ChatBoxEntity;

  @OneToMany(() => ChatGroupEntity, (chat) => chat.message)
  @JoinColumn()
  chatGroup?: ChatGroupEntity;

  constructor(props?: MessageEntity) {
    super();
    if (props) {
      this.messageId = props.messageId;
      this.senderId = props.senderId;
      this.messageType = props.messageType;
      this.contentText = props.contentText;
      this.contentImage = props.contentImage;
      this.contentAudio = props.contentAudio;
      this.contentVideo = props.contentVideo;
      this.contentFile = props.contentFile;
      this.chatBox = props.chatBox;
      this.chatGroup = props.chatGroup;
    }
    Object.assign(this, props);
  }
}
