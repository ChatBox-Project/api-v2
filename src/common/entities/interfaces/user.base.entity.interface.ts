import { EGender } from 'src/configs';
import { IBaseEntity } from './base.entity.interface';
import { AccountEntity } from '../account.entity';
import { ChatBoxEntity } from '../chat-box.entity';
import { ChatGroupEntity } from '../chat-group.entity';
import { GroupLeaderPermissionEntity } from '../group-leader-permission.entity';
import { IListFriend } from './listFriend.interface';

export interface IUserEntity extends IBaseEntity {
  name: string;
  gender: EGender;
  avatarUrl: string;
  birth: Date;
  listFriend: IListFriend[];
}