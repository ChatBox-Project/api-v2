import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IMessage } from './interfaces/message.entity.interface';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity implements IMessage {
  @Index('IX_MESSAGE_MESSAGE_ID', { unique: false })
  @Column({ type: 'uuid', nullable: true })
  messageId?: string;
  @Index('IX_MESSAGE_CHATBOX_ID', { unique: false })
  @Column({ type: 'uuid', nullable: true })
  chatboxId?: string;
  @Index('IX_MESSAGE_SENDER_ID', { unique: false })
  @Column({ type: 'uuid', nullable: true })
  senderId?: string;

  @Column({ type: 'varchar', nullable: true })
  messageType?: string;
  @Column({ type: 'varchar', nullable: true })
  contentText?: string;
  @Column({ type: 'varchar', nullable: true })
  contentImage?: string;
  @Column({ type: 'varchar', nullable: true })
  contentAudio?: string;
  @Column({ type: 'varchar', nullable: true })
  contentVideo?: string;
  @Column({ type: 'varchar', nullable: true })
  contentFile?: string;

  constructor(props?: IMessage) {
    super();
    if (props) {
      this.messageId = props.messageId;
      this.chatboxId = props.chatboxId;
      this.senderId = props.senderId;
      this.messageType = props.messageType;
      this.contentText = props.contentText;
      this.contentImage = props.contentImage;
      this.contentAudio = props.contentAudio;
      this.contentVideo = props.contentVideo;
      this.contentFile = props.contentFile;
    }
    Object.assign(this, props);
  }
}
