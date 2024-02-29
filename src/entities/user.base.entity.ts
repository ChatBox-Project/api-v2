import { Column, Entity, Index } from 'typeorm';
import { IUserBaseEntity } from './interfaces/user.base.entity.interface';
import { EGender } from 'src/configs';
import { BaseEntity } from './bases/base.entity';
import {
  IAccountEntity,
  IChatBoxEntity,
  IChatGroupEntity,
  IGroupLeaderPermission,
} from './interfaces';

@Entity({ name: 'user_base' })
export class UserBaseEntity extends BaseEntity implements IUserBaseEntity {
  firstName: string;
  lastName: string;
  phone: number;
  sex: EGender;
  avatarUrl: string;
  birth: Date;
  accountId: IAccountEntity;
  chatBoxId?: IChatBoxEntity[];
  chatGroupId?: IChatGroupEntity[];
  groupLeaderPermissionId?: IGroupLeaderPermission[];
}
