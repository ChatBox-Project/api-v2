import { Column, Entity } from 'typeorm';
import { IPermission } from './interfaces/permission.entity.interface';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces';

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity implements IPermission {
  name: string;
  groupLeaderPermissionId: IGroupLeaderPermission[];
}
