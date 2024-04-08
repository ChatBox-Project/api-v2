import { UserEntity } from '../user.base.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IChatBoxEntity extends IBaseEntity {
  chatBoxName: string;
  sender_id: string;
  receiver_id: string;
}
