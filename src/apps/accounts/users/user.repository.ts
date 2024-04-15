import { UserEntity } from 'src/common/entities/user.base.entity';
import { BaseRepository } from '../../../common/repositories-postgres/base.repository';

export class UserRepository extends BaseRepository<UserEntity> {}
