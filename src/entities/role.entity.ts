import { Column, Entity } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IRole } from './interfaces/role.entity.interface';
import { IAccountEntity } from './interfaces';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity implements IRole {
  roleId: string;
  roleName: string;
  accountId: IAccountEntity;
}
