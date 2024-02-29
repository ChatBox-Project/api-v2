import { EGender } from 'src/configs';
import { IBaseEntity } from './base.entity.interface';
import { IAccountEntity } from './account.entity.interface';
import { IChatBoxEntity } from './chat-box.entity.interface';
import { IChatGroupEntity } from './chat-group.entity.interface';
import { IGroupLeaderPermission } from './group-leader-permission.entity.interface';

export interface IUserBaseEntity extends IBaseEntity {
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
