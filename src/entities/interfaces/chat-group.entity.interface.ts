import { GroupLeaderPermissionEntity } from '../group-leader-permission.entity';
import { MessageEntity } from '../message.entity';
import { UserBaseEntity } from '../user.base.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IChatGroupEntity extends IBaseEntity {
  groupId: string;
  groupName: string;
  groupMembers?: string[];
  groupLeader: string;

  user: UserBaseEntity[];
  groupLeaderPermission: GroupLeaderPermissionEntity;
  message: MessageEntity[];
}
