import { Column, Index } from 'typeorm';
import { IUserBaseEntity } from './interfaces/user.base.entity.interface';
import { EGender } from 'src/configs';
import { BaseEntity } from './bases/base.entity';

export class UserBaseEntity extends BaseEntity implements IUserBaseEntity {
  birth: Date;
  @Index({ unique: true })
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;
  @Column({ type: 'varchar', length: 10 })
  phone: number;

  @Column({
    type: 'varchar',
    length: 255,
    enum: EGender,
    default: EGender.other,
  })
  sex: EGender;
  @Column({ type: 'varchar', length: 255 })
  avatarUrl: string;

  @Column({ type: 'varchar' })
  firstName: string;
}
