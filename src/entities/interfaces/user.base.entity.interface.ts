import { EGender } from 'src/configs';
import { IBaseEntity } from './base.entity.interface';

export interface IUserBaseEntity extends IBaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  phone: number;
  sex: EGender;
  avatarUrl: string;
  birth: Date;
}
