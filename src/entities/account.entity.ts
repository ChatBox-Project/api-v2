import { Column, Entity, Index, OneToOne } from 'typeorm';
import { IdEntity } from './bases/id.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';
import { RoleEntity } from './role.entity';

@Entity({ name: 'account' })
export class AccountEntity extends IdEntity implements IAccountEntity {}
