import { IBaseEntity } from './base.entity.interface';

export interface IMessage extends IBaseEntity {
  messageId: string;
  authorId: string;
  messageType: string;
  messageContent: string;
}
