import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './bases/base.entity';
import { IMessage } from './interfaces/message.entity.interface';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity implements IMessage {
 }
