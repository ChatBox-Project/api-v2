import { EGender } from 'src/configs';
import { IBaseEntity } from './base.entity.interface';
import { AccountEntity } from '../account.entity';
import { ChatBoxEntity } from '../chat-box.entity';
import { ChatGroupEntity } from '../chat-group.entity';
import { GroupLeaderPermissionEntity } from '../group-leader-permission.entity';

export interface IUserEntity extends IBaseEntity {
  firstName: string;
  lastName: string;
  gender: EGender;
  avatarUrl: string;
  birth: Date;

  account: AccountEntity;
  chatBox?: ChatBoxEntity[];
  chatGroup?: ChatGroupEntity[];
  groupLeaderPermission?: GroupLeaderPermissionEntity[];
}
