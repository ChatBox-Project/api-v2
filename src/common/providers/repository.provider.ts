import { Provider } from '@nestjs/common';
import { AccountRepository } from 'src/apps/accounts/account.repository';
import { RoleRepository } from 'src/apps/accounts/roles/role.repository';
import { ChatBoxRepository } from 'src/apps/chat-box/chat-box.entity';
import { ChatGroupRepository } from 'src/apps/chat-groups/chat-group.repository';
import { MessageRepository } from 'src/apps/messages/message.repository';
import { GroupLeaderPermissionRepository } from 'src/apps/permissions/group-leader/group-leader-permission.repository';
import { PermissionRepository } from 'src/apps/permissions/permission.repository';
import { BaseRepository } from 'src/common/repositories';
import { DataSource } from 'typeorm';

const repositories = [
  AccountRepository,
  BaseRepository,
  ChatBoxRepository,
  ChatGroupRepository,
  MessageRepository,
  PermissionRepository,
  RoleRepository,
  GroupLeaderPermissionRepository,
];

const RepositoriesProvider: Provider[] = [];

for (const repository of repositories) {
  RepositoriesProvider.push({
    provide: repository,
    useFactory: (data: DataSource) => data.getCustomRepository(repository),
    inject: [DataSource],
  });
}
