import { IBaseEntity } from './base.entity.interface';

export interface IMessage extends IBaseEntity {
  messageId?: string;
  chatboxId?: string;
  senderId?: string;
  messageType?: string;
  contentText?: string;
  contentImage?: string;
  contentAudio?: string;
  contentVideo?: string;
  contentFile?: string;
}
