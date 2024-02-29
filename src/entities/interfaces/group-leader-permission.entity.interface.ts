import { IBaseEntity } from './base.entity.interface';
import { IChatGroupEntity } from './chat-group.entity.interface';
import { IPermission } from './permission.entity.interface';
import { IUserBaseEntity } from './user.base.entity.interface';

export interface IGroupLeaderPermission extends IBaseEntity {
  group_leader_permissionId?: string;

  leaderId?: IUserBaseEntity;
  groupId?: IChatGroupEntity[] | string;
  permissionId: IPermission;
}
