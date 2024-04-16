import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { MessagesRepository } from 'src/common';
import { Messages, MessagesDocument } from 'src/common/models/message.model';

import { ErrorResponse } from 'src/errors';
import { CreateMessageDto } from './dtos';
import { AccountEntity } from 'src/common/entities';
import { AccountRepository } from '../accounts/account.repository';
import { UserService } from '../accounts/users/user.service';
import { ResponseService } from 'src/common/res';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Messages.name) private readonly messageModel: Model<MessagesDocument>,
    @InjectRepository(AccountEntity) private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
    private readonly messagesRepository: MessagesRepository,
    private readonly _res: ResponseService,
  ) {}

  private async getSenderInfo(senderId: string) {
    return {
      user_id: senderId,
      nick_name: '',
      joinedDate: new Date(),
      is_removed: false,
    };
  }

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
        .sort({ createdAt: -1 })
        .skip(data?.offset)
        .limit(data?.limit)
        .lean();

      // console.log('message_doc', message_doc);

      const messages = [];

      for (const message of message_doc) {
        const author = await this.getSenderInfo(message.authorId);
        // console.log('author', author);
        const messageWithAuthor = {
          ...message,
          author: {
            user_id: author.user_id,
            joinedDate: author.joinedDate || message.createdAt,
            is_removed: author.is_removed,
          },
        };
        // console.log('messageWithAuthor:::', messageWithAuthor);
        messages.push(messageWithAuthor);
      }
      // console.log('messages', messages);
      const metadata = { messages };
      return this._res.createResponse(200,'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_MESSAGE_FAIL',
      });
    }
  }
  public async save(token: string, conversationId: string, message: CreateMessageDto) {
    try {
      const holderAccount = await this.userService.findAccountByToken(token);
      // console.log('holderAccount', holderAccount);
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const user = await this.userService.findUserByAccountId(holderAccount.id);

      // console.log('user', user);

      const newMessage = await this.messageModel.create({
        authorId: user.id,
        content: message.content,
        content_type: message.contentType,
        conversation: conversationId,
      });
      console.log('newMessage', newMessage);

      const metadata = { newMessage };
      return this._res.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_MESSAGE_FAIL',
      });
    }
  }
  public async getAllMessagesInConversation(token: string, conversationId: string) {}
  public async recovery(data: any) {}
}
