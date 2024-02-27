import { IBaseEntity } from './base.entity.interface';

export interface IRole extends IBaseEntity {
  roleId: string;
  roleName: string;
}
