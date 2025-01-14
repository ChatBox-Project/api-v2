import { UUID } from 'crypto';

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
}
