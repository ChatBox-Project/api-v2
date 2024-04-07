import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from './interfaces/user.base.entity.interface';
import { EGender } from 'src/configs';
import { BaseEntity } from './bases/base.entity';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AccountEntity } from './account.entity';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { GroupLeaderPermissionEntity } from './group-leader-permission.entity';

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

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts: AccountEntity[];

  // @Column({ name: 'chat_box_id', type: 'uuid' })
  // @ManyToOne(() => ChatBoxEntity, (chat) => chat.chatBoxId)
  // @JoinColumn()
  // chatBox?: ChatBoxEntity[];

  // @Column({ name: 'chat_group_id', type: 'uuid' })
  // @ManyToMany(() => ChatGroupEntity)
  // @JoinTable()
  // chatGroup?: ChatGroupEntity[];

  // @Column({ name: 'group_leader_permission_id', type: 'uuid' })
  // @ManyToOne(() => GroupLeaderPermissionEntity, (gr) => gr.leaderId)
  // @JoinColumn()
  // groupLeaderPermission?: GroupLeaderPermissionEntity[];
}
