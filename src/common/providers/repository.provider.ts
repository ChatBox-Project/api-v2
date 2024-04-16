import { Provider } from '@nestjs/common';
import { AccountRepository } from 'src/apps/accounts/account.repository';


import { BaseRepository } from 'src/common/repositories-postgres';
import { DataSource } from 'typeorm';

const repositories = [AccountRepository, BaseRepository];

const RepositoriesProvider: Provider[] = [];

for (const repository of repositories) {
  RepositoriesProvider.push({
    provide: repository,
    useFactory: (data: DataSource) => data.getCustomRepository(repository),
    inject: [DataSource],
  });
}
