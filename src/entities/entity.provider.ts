import { AccountEntity } from './account.entity';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { GroupLeaderPermission } from './group-leader-permission.entity';
import { MessageEntity } from './message.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

export const entities = [
  AccountEntity,
  ChatBoxEntity,
  GroupLeaderPermission,
  RoleEntity,
  MessageEntity,
  PermissionEntity,
  ChatGroupEntity,
];
