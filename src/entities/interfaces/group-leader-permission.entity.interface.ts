import { IBaseEntity } from './base.entity.interface';

export interface IGroupLeaderPermission extends IBaseEntity {
  groupId?: string;
  leaderId?: string;
  permissionId?: string;
  group_leader_permissionId?: string;
}
