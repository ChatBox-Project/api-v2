import { GroupLeaderPermissionEntity } from '../group-leader-permission.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IPermission extends IBaseEntity {
  name: string;
  groupLeaderPermission: GroupLeaderPermissionEntity[];
}
