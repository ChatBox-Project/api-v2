import { ChatGroupEntity } from '../chat-group.entity';
import { PermissionEntity } from '../permission.entity';
import { UserEntity } from '../user.base.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IGroupLeaderPermission extends IBaseEntity {
  group_leader_permissionId: string;
  // leaderId: UserEntity;
  group: ChatGroupEntity[] | string;

  permission: PermissionEntity; // permissionId
}
