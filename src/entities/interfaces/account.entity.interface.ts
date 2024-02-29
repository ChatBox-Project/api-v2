import { RoleEntity } from '../role.entity';
import { UserBaseEntity } from '../user.base.entity';
import { IIdEntity } from './id.entity.interface';

export interface IAccountEntity extends IIdEntity {
  username: string;
  email: string;
  password: string;
  passwordSalt: string;

  jwtToken: string;
  refreshToken: string;
  verified: boolean;
  verificationExpires: Date;
  loginAttempts: number;
  blockExpires: Date;

  role?: RoleEntity;
  user: UserBaseEntity;
}
