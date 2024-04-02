import { UUID } from 'crypto';
import { RoleEntity } from '../role.entity';
import { UserEntity } from '../user.base.entity';
import { IIdEntity } from './id.entity.interface';

export interface IAccountEntity extends IIdEntity {
  phoneNumber: string;
  password: string;
  refreshToken?: string;
  accessToken?: string;
  verified?: boolean;
  verificationExpires?: Date;
  loginAttempts?: number;
  blockExpires?: Date;
  publicKey?: string;
  role?: RoleEntity;
  user?: UserEntity;
}
