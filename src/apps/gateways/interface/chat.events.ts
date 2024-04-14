import { ChatBoxEntity, MessageEntity } from 'src/common/entities';

export interface ServerToClientMessage {
  newChat: (payload: ChatBoxEntity) => void;
}
