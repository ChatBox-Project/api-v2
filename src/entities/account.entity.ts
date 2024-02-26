import { Column, Entity, Index } from 'typeorm';
import { IdEntity } from './bases/id.entity';
import { IAccountEntity } from './interfaces/account.entity.interface';

@Entity({ name: 'account' })
export class AccountEntity extends IdEntity implements IAccountEntity {
  @Column({ type: 'varchar', length: 300 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  @Index('IX_Account_Email', { unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  passwordSalt: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 4096, nullable: true })
  @Index('IX_Account_Token')
  jwtToken: string;

  @Column({ type: 'varchar', length: 4096, nullable: true })
  @Index('IX_Account_RefreshToken')
  refreshToken: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  verified: boolean;
  @Column({
    type: 'varchar',
    array: true,
    nullable: false,
    default: '{"user"}',
  })
  roles: string[];

  @Column({ type: 'date', nullable: true })
  verificationExpires: Date;

  @Column({ type: 'integer', nullable: false, default: 0 })
  loginAttempts: number;

  @Column({ type: 'date', nullable: true })
  blockExpires: Date;

  constructor(props?: IAccountEntity) {
    super();
    if (props) {
      this.username = props.username;
      this.email = props.email;
      this.password = props.password;
      this.passwordSalt = props.passwordSalt;
      this.firstName = props.firstName;
      this.jwtToken = props.jwtToken;
      this.refreshToken = props.refreshToken;
      this.verified = props.verified;
      this.roles = props.roles;
      this.verificationExpires = props.verificationExpires;
      this.loginAttempts = props.loginAttempts;
      this.blockExpires = props.blockExpires;
    }
    Object.assign(this, props);
  }
}
