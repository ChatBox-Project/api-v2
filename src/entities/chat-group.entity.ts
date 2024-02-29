import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IChatGroupEntity } from './interfaces/chat-group.entity.interface';

@Entity({ name: 'chat-group' })
export class ChatGroupEntity extends BaseEntity implements IChatGroupEntity {}
