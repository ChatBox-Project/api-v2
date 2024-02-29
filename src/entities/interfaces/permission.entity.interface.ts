import { IBaseEntity } from './base.entity.interface';
import { IGroupLeaderPermission } from './group-leader-permission.entity.interface';

export interface IPermission extends IBaseEntity {
  name: string;
  groupLeaderPermissionId: IGroupLeaderPermission[];
}
