import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages, MessagesDocument } from '../models/message.model';
import { BaseRepository } from './base.repository';

@Injectable()
export class MessagesRepository extends BaseRepository<MessagesDocument> {
  constructor(@InjectModel(Messages.name) private messagesModel: Model<MessagesDocument>) {
    super(messagesModel);
  }
}
