import { ChatBoxEntity } from '../chat-box.entity';
import { ChatGroupEntity } from '../chat-group.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IMessage extends IBaseEntity {
  messageId: string;
  senderId: string;
  messageType?: string;
  contentText?: string;
  contentImage?: string;
  contentAudio?: string;
  contentVideo?: string;
  contentFile?: string;

  chatBox?: ChatBoxEntity;
  chatGroup?: ChatGroupEntity;
}
