import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IdEntity } from './bases/id.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';

import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from './role.entity';

import { BaseEntity } from './bases/base.entity';
import { UserEntity } from './user.base.entity';
import { UUID } from 'crypto';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity implements IAccountEntity {
  @Index('IX_Account_PhoneNumber', { unique: true })
  @Column({ name: 'phoneNumber', type: 'char', length: 10, unique: true })
  phoneNumber: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  @IsNotEmpty()
  password: string;

  @Index('IX_Account_RefreshToken', { unique: true })
  @Column({ name: 'refresh_token', type: 'varchar', unique: true, default: '' })
  refreshToken?: string;

  @Column({ name: 'keyToken', type: 'varchar', default: '' })
  keyToken?: string;

  @Column({ name: 'verified', type: 'boolean', default: false })
  verified?: boolean;

  @Column({
    name: 'verification_expires',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  verificationExpires?: Date;

  @Column({ name: 'login_attempts', type: 'integer', default: 0 })
  loginAttempts?: number;

  @Column({
    name: 'block_expires',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  blockExpires: Date;
  publicKey?: string;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role?: RoleEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
