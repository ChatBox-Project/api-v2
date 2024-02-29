import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IRole } from './interfaces/role.entity.interface';
import { AccountEntity } from './account.entity';
import { RoleEnum } from 'src/configs/enums/role.enum';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity implements IRole {
  @Column({ name: 'role_id', type: 'uuid' })
  roleId: string;
  @Column({ name: 'role_name', enum: RoleEnum, default: RoleEnum.user })
  roleName: RoleEnum;

  @OneToOne(() => AccountEntity)
  @JoinColumn()
  accountId: AccountEntity;
}
