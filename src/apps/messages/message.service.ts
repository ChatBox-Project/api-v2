import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { MessagesRepository } from 'src/common';
import { Messages, MessagesDocument } from 'src/common/models/message.model';

import { ErrorResponse } from 'src/errors';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Messages.name) private readonly messageModel: Model<MessagesDocument>,
    private readonly messagesRepository: MessagesRepository,
  ) {}

  public async getAllByContentType(contentType: string, conversation_id: string) {
    try {
      const messages = await this.messageModel.find({ conversation: conversation_id, contentType: contentType });
      console.log('messages', messages);
      return messages;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_MESSAGE_FAIL',
      });
    }
  }
  public async getAllByContentTypeTop4(contentType: string, conversation_id: string) {
    try {
      const messages = await this.messageModel.find({ conversation: conversation_id, contentType: contentType }).limit(4).sort({ createdAt: -1 });
      console.log('messages', messages);
      return messages;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_MESSAGE_FAIL',
      });
    }
  }
  public async getMessageByConversationId(conversation_id: string, data: any) {
    try {
      const message_doc = await this.messageModel
        .find({ conversation: conversation_id })
        .populate({ path: 'conversation' })
        .populate('sender')
        .sort({ createdAt: -1 })
        .skip(data?.offset)
        .limit(data?.limit)
        .lean();

      const message = [];

      let sender;
      console.log('message_doc::', message_doc);


    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_MESSAGE_FAIL',
      });
    }
  }
  public async save(data: any) {}
  public async recovery(data: any) {}
}
