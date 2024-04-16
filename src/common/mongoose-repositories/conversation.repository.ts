import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from './base.repository';
import { Conversation, ConversationDocument } from '../models/conversation.model';

@Injectable()
export class ConversationRepository extends BaseRepository<ConversationDocument> {
  constructor(@InjectModel(Conversation.name) private readonly conversationRepository: Model<ConversationDocument>) {
    super(conversationRepository);
  }
}
