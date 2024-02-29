import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IGroupLeaderPermission } from './interfaces/group-leader-permission.entity.interface';

@Entity({ name: 'group-leader-permission' })
export class GroupLeaderPermission
  extends BaseEntity
  implements IGroupLeaderPermission
{
}
