import { IIdEntity } from './id.entity.interface';

export interface IAccountEntity extends IIdEntity {
  username: string;
  email: string;
  password: string;
  passwordSalt: string;
  firstName: string;

  jwtToken: string;
  refreshToken: string;
  verified: boolean;
  roles: string[];
  verificationExpires: Date;
  loginAttempts: number;
  blockExpires: Date;
}