import { UserBaseEntity } from '../user.base.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IChatBoxEntity extends IBaseEntity {
  chatBoxId: string;
  chatBoxName: string;
  user: UserBaseEntity;
}
