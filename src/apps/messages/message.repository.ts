import { BaseRepository } from '../../common/repositories-postgres/base.repository';
import { MessageEntity } from '../../common/entities/message.entity';

export class MessageRepository extends BaseRepository<MessageEntity> {}
