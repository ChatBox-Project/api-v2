import { Provider } from '@nestjs/common';
import { AccountRepository } from 'src/apps/accounts/account.repository';
import { RoleRepository } from 'src/apps/accounts/roles/role.repository';

import { MessageRepository } from 'src/apps/messages/message.repository';
import { GroupLeaderPermissionRepository } from 'src/apps/permissions/group-leader/group-leader-permission.repository';
import { PermissionRepository } from 'src/apps/permissions/permission.repository';
import { BaseRepository } from 'src/common/repositories-postgres';
import { DataSource } from 'typeorm';

const repositories = [AccountRepository, BaseRepository, MessageRepository, PermissionRepository, RoleRepository, GroupLeaderPermissionRepository];

const RepositoriesProvider: Provider[] = [];

for (const repository of repositories) {
  RepositoriesProvider.push({
    provide: repository,
    useFactory: (data: DataSource) => data.getCustomRepository(repository),
    inject: [DataSource],
  });
}
