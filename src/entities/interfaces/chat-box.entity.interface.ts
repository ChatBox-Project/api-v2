import { IBaseEntity } from './base.entity.interface';
import { IUserBaseEntity } from './user.base.entity.interface';

export interface IChatBoxEntity extends IBaseEntity {
  chatBoxId: string;
  chatBoxName: string;
  userId: IUserBaseEntity;
}
