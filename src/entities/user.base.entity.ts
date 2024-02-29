import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { IUserBaseEntity } from './interfaces/user.base.entity.interface';
import { EGender } from 'src/configs';
import { BaseEntity } from './bases/base.entity';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AccountEntity } from './account.entity';
import { ChatBoxEntity } from './chat-box.entity';
import { ChatGroupEntity } from './chat-group.entity';
import { GroupLeaderPermissionEntity } from './group-leader-permission.entity';

@Entity({ name: 'user_base' })
export class UserBaseEntity extends BaseEntity implements IUserBaseEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  @IsString()
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  @IsString()
  lastName: string;

  @Column({ name: 'phone', type: 'integer' })
  @IsPhoneNumber()
  @Index('IX_UserBase_PhoneNumber', { unique: true })
  phone: number;

  @Column({ name: 'sex', enum: EGender, default: EGender.other })
  sex: EGender;

  @Column({ name: 'avatar_url', type: 'varchar', length: 255 })
  @IsString()
  avatarUrl: string;

  @Column({ name: 'birth', type: 'date', default: new Date() })
  birth: Date;

  @Column({ name: 'accound_id', type: 'uuid' })
  @IsNotEmpty()
  @OneToOne(() => AccountEntity)
  @JoinColumn()
  account: AccountEntity;

  @Column({ name: 'chat_box_id', type: 'uuid' })
  @ManyToOne(() => ChatBoxEntity, (chat) => chat.chatBoxId)
  @JoinColumn()
  chatBox?: ChatBoxEntity[];

  @Column({ name: 'chat_group_id', type: 'uuid' })
  @ManyToMany(() => ChatGroupEntity)
  @JoinTable()
  chatGroup?: ChatGroupEntity[];

  @Column({ name: 'group_leader_permission_id', type: 'uuid' })
  @ManyToOne(() => GroupLeaderPermissionEntity, (gr) => gr.leaderId)
  @JoinColumn()
  groupLeaderPermission?: GroupLeaderPermissionEntity[];

  constructor(props?: UserBaseEntity) {
    super();
    if (props) {
      this.firstName = props.firstName;
      this.lastName = props.lastName;
      this.phone = props.phone;
      this.sex = props.sex;
      this.avatarUrl = props.avatarUrl;
      this.birth = props.birth;
      this.account = props.account;
      this.chatBox = props.chatBox;
      this.chatGroup = props.chatGroup;
      this.groupLeaderPermission = props.groupLeaderPermission;
    }
    Object.assign(this, props);
  }
}
