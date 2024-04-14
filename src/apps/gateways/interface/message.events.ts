import { MessageEntity } from 'src/common/entities';

export interface ServerToClientMessage {
  newMessage: (payload: MessageEntity) => void;
}
