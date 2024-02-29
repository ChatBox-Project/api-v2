import { Column, Entity } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IRole } from './interfaces/role.entity.interface';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity implements IRole {
  @Column({ type: 'uuid' })
  roleId: string;
  @Column({ type: 'varchar', length: 255 })
  roleName: string;
}