import { Column, Entity, Index } from 'typeorm';
import { IUserBaseEntity } from './interfaces/user.base.entity.interface';
import { EGender } from 'src/configs';
import { BaseEntity } from './bases/base.entity';

@Entity({ name: 'user_base' })
export class UserBaseEntity extends BaseEntity implements IUserBaseEntity {}
