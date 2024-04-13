import { IBaseEntity } from './base.entity.interface';

export interface IMessage extends IBaseEntity {
  messageId: string;
  senderId: string;
  messageType: string;
}
