import { IChatBoxEntity } from './interfaces/chat-box.entity.interface';
import { BaseEntity } from './bases/base.entity';
import { Column, Entity, Index, JoinColumn, OneToMany } from 'typeorm';
import { UserBaseEntity } from './user.base.entity';

@Entity({ name: 'chat-box' })
export class ChatBoxEntity extends BaseEntity implements IChatBoxEntity {
  @Index('IX_ChatBox_ChatBoxId', { unique: true })
  @Column({ name: 'chat_box_id', type: 'varchar', length: 255 })
  chatBoxId: string;

  @Index('IX_ChatBox_ChatBoxName', { unique: true })
  @Column({ name: 'chat_box_name', type: 'varchar', length: 255 })
  chatBoxName: string;

  @OneToMany(() => UserBaseEntity, (user) => user.chatBoxId)
  @JoinColumn()
  userId: UserBaseEntity;
}
