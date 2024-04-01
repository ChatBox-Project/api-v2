import { AccountEntity } from '../account.entity';
import { IBaseEntity } from './base.entity.interface';

export interface IOtpEntity extends IBaseEntity {
  id: string;
  owner: AccountEntity;
  accountId: string;
  code: string;
}
