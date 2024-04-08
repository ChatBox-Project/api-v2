import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IRole } from './role.entity.interface';
import { AccountEntity } from './account.entity';
import { RoleEnum } from 'src/configs/enums/role.enum';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity implements IRole {
  @Column({ name: 'role_id', type: 'uuid' })
  @PrimaryGeneratedColumn()
  roleId: string;
  @Column({ name: 'role_name', enum: RoleEnum, default: RoleEnum.user })
  roleName: RoleEnum;

  @OneToOne(() => AccountEntity)
  account: AccountEntity;
}
