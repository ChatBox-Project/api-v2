import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IMessage } from './interfaces/message.entity.interface';
import { IChatBoxEntity, IChatGroupEntity } from './interfaces';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity implements IMessage {
  messageId?: string;
  chatboxId?: string;
  senderId?: string;
  messageType?: string;
  contentText?: string;
  contentImage?: string;
  contentAudio?: string;
  contentVideo?: string;
  contentFile?: string;
  chatBoxId: IChatBoxEntity;
  chatGroupId?: IChatGroupEntity;
}
