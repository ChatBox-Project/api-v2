import { IIdEntity } from './id.entity.interface';
import { IRole } from './role.entity.interface';
import { IUserBaseEntity } from './user.base.entity.interface';

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

  role?: IRole;
  userId: IUserBaseEntity;
}
