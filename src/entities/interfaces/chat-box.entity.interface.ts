import { IBaseEntity } from './base.entity.interface';

export interface IChatBoxEntity extends IBaseEntity {
  chatBoxId: string;
  chatBoxName: string;
  userId: string[];
}
