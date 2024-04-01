import { RoleEnum } from 'src/configs/enums/role.enum';
import { IBaseEntity } from './interfaces/base.entity.interface';
import { AccountEntity } from './account.entity';

export interface IRole extends IBaseEntity {
  roleId: string;
  roleName: RoleEnum;
  account: AccountEntity;
}
