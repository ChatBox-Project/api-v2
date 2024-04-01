import { Column, Entity, Index } from 'typeorm';
import { IOtpEntity } from './interfaces';
import { IdEntity } from './bases/id.entity';
import { AccountEntity } from './account.entity';
import { BaseEntity } from './bases/base.entity';

@Entity({ name: 'otp' })
export class OtpEntity extends BaseEntity implements IOtpEntity {
  @Index('IX_Otp_Owner', { unique: true })
  @Column({ name: 'owner_id', type: 'uuid' })
  owner: AccountEntity;
  @Index('IX_Otp_AccountId', { unique: true })
  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;
  @Index('IX_Otp_Code', { unique: true })
  @Column({ name: 'code', type: 'varchar', length: 6 })
  code: string;
}
