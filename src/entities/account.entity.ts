import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { IdEntity } from './bases/id.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';

import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from './role.entity';
import { UserBaseEntity } from './user.base.entity';

@Entity({ name: 'account' })
export class AccountEntity extends IdEntity implements IAccountEntity {
  @Index('IX_Account_Username', { unique: true })
  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  @IsNotEmpty()
  password: string;

  @Column({ name: 'password_salt', type: 'varchar' })
  @IsNotEmpty()
  passwordSalt?: string;

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

  @OneToOne(() => UserBaseEntity)
  @JoinColumn()
  user: UserBaseEntity;

  constructor(props?: AccountEntity) {
    super();
    if (props) {
      this.username = props.username;
      this.password = props.password;
      this.passwordSalt = props.passwordSalt;

      this.refreshToken = props.refreshToken;
      this.verified = props.verified;
      this.verificationExpires = props.verificationExpires;
      this.loginAttempts = props.loginAttempts;
      this.blockExpires = props.blockExpires;
      this.role = props.role;
      this.user = props.user;
    }
    Object.assign(this, props);
  }
}
