import { IBaseEntity } from './base.entity.interface';
import { IGroupLeaderPermission } from './group-leader-permission.entity.interface';
import { IUserBaseEntity } from './user.base.entity.interface';

export interface IChatGroupEntity extends IBaseEntity {
  groupId?: string;
  chatBoxId?: string;
  groupName?: string;
  groupMembers?: string[];
  groupLeaderId: string;

  userId: IUserBaseEntity[];
  groupLeaderPermissionId: IGroupLeaderPermission;
}
