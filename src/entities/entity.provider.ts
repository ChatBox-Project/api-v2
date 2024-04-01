import { AccountEntity } from './account.entity';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { GroupLeaderPermissionEntity } from './group-leader-permission.entity';
import { MessageEntity } from './message.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.base.entity';

export const entities = [
  AccountEntity,
  ChatBoxEntity,
  GroupLeaderPermissionEntity,
  RoleEntity,
  MessageEntity,
  PermissionEntity,
  ChatGroupEntity,
  UserEntity,
];
