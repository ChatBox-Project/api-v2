import { IIdEntity } from './id.entity.interface';

export interface IBaseEntity extends IIdEntity {
  isActive: boolean;
  isArchieved: boolean;
  createBy: string;
  lastChangedBy: string;
  internalComment: string | null;
}
