import { IBaseEntity } from './base.entity.interface';

export interface IChatGroupEntity extends IBaseEntity {
  groupId?: string;
  chatBoxId?: string;
  groupName?: string;
  groupMembers?: string[];
  groupLeaderId: string;
}
