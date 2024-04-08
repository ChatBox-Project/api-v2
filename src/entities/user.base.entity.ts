import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from './interfaces/user.base.entity.interface';
import { EGender } from 'src/configs';
import { BaseEntity } from './bases/base.entity';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AccountEntity } from './account.entity';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { GroupLeaderPermissionEntity } from './group-leader-permission.entity';
import { IListFriend } from './interfaces';
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUserEntity {
  @Index('IX_USER_ID', { unique: true })
  @Column({ name: 'user_id', type: 'uuid' })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar', default: '' })
  @IsString()
  name: string;

  @Column({ name: 'sex', enum: EGender, default: EGender.other })
  gender: EGender;

  @Column({ name: 'avatar_url', type: 'varchar', default: '' })
  @IsString()
  avatarUrl: string;

  @Column({ name: 'birth', type: 'date', default: new Date() })
  birth: Date;

  @Index('IX_USER_FRIEND')
  @Column('jsonb', { array: true, default: [] })
  listFriend: IListFriend[];

  @OneToOne(() => AccountEntity, (account) => account.user)
  accounts: AccountEntity;

  @JoinTable()
  @OneToMany(() => ChatBoxEntity, (chat) => chat.user)
  chatBox: ChatBoxEntity[] ;

  
  @ManyToMany(() => ChatGroupEntity)
  @JoinTable()
  chatGroup?: ChatGroupEntity[];

  @ManyToOne(() => GroupLeaderPermissionEntity, (gr) => gr.leaderId)
  groupLeaderPermission?: GroupLeaderPermissionEntity[];
}
