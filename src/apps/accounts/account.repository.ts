import { AccountEntity } from '../../common/entities/account.entity';
import { BaseRepository } from '../../common/repositories-postgres/base.repository';

export class AccountRepository extends BaseRepository<AccountEntity> {}
