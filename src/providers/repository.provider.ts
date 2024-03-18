import { Provider } from '@nestjs/common';
import {
  AccountRepository,
  ChatBoxRepository,
  ChatGroupRepository,
  GroupLeaderPermissionRepository,
  MessageRepository,
  PermissionRepository,
  RoleRepository,
} from 'src/repositories';
import { BaseRepository } from 'src/repositories';
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
