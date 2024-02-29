import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { IdEntity } from './bases/id.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';

import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from './role.entity';
import { UserBaseEntity } from './user.base.entity';

@Entity({ name: 'account' })
export class AccountEntity extends IdEntity implements IAccountEntity {
  @Index('IX_Account_Username', { unique: true })
  @Column({ name: 'username', type: 'varchar', length: 50 })
  username: string;

  @Index('IX_Account_Email', { unique: true })
  @Column({ name: 'email', type: 'varchar', length: 50 })
  @IsEmail()
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 50 })
  @IsNotEmpty()
  password: string;

  @Column({ name: 'password_salt', type: 'varchar', length: 50 })
  @IsNotEmpty()
  passwordSalt: string;

  @Index('IX_Account_JwtToken', { unique: true })
  @Column({ name: 'jwt_token', type: 'varchar', length: 4069 })
  jwtToken: string;

  @Index('IX_Account_RefreshToken', { unique: true })
  @Column({ name: 'refresh_token', type: 'varchar', length: 4069 })
  refreshToken: string;

  @Column({ name: 'verified', type: 'boolean', default: false })
  verified: boolean;

  @Column({
    name: 'verification_expires',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  verificationExpires: Date;

  @Column({ name: 'login_attempts', type: 'integer', default: 0 })
  loginAttempts: number;
  @Column({
    name: 'block_expires',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  blockExpires: Date;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role?: RoleEntity;

  @OneToOne(() => UserBaseEntity)
  @JoinColumn()
  userId: UserBaseEntity;
}
