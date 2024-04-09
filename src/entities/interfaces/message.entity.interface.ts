import { IBaseEntity } from './base.entity.interface';

export interface IMessage extends IBaseEntity {
  messageId: string;
  senderId: string;
  contentMessage: string;
  messageType: string;
}
