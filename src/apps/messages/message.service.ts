import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatBoxEntity } from 'src/common/entities';
import { AccountEntity } from 'src/common/entities/account.entity';
import { MessageEntity } from 'src/common/entities/message.entity';
import { UserEntity } from 'src/common/entities/user.base.entity';
import { ErrorResponse } from 'src/errors';

import { ResponseService } from '../../common/res';
import { MessageRepository } from './message.repository';
import { ChatBoxRepository } from '../chat-box/chat-box.entity';
import { UserRepository } from '../accounts/users/user.repository';
import { AccountRepository } from '../accounts/account.repository';
import { CreateMessageDto } from './dtos';
import { Gateway } from '../gateways/gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly _messageRepository: MessageRepository,
    @InjectRepository(ChatBoxEntity) private readonly _chatBoxRepository: ChatBoxRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    private readonly eventGateway: Gateway,
    private readonly _response: ResponseService,
  ) {}

  public async createMessage(_token: string, _id: string, payload: CreateMessageDto): Promise<unknown> {
    try {
      const [userholder, chatbox] = await Promise.all([this.findUser(_token), this._chatBoxRepository.findOneOrFail({ where: { id: _id } })]);

      const saveMessage = await this._messageRepository.create({
        ...payload,
        authorId: userholder.id,
        chatBox: chatbox,
      });
      // console.log('saveMessage:: ', saveMessage);
      await this._messageRepository.save(saveMessage);

      // send message to gateway
      this.eventGateway.sendMessage(saveMessage, _id);

      const metadata = { message: saveMessage };
      const res = this._response.createResponse(200, 'Create message success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'USER_NOT_FOUND',
      });
    }
  }

  public async getChatboxMessages(token: string, _id: string): Promise<MessageEntity[]> {
    try {
      const holderUser = await this.findUser(token);
      const chatBox = await this._chatBoxRepository.findOneOrFail({ where: { id: _id } });

      const messages = await this._messageRepository.find({
        order: { createDateTime: 'DESC' },
        where: { chatBox: { id: _id } },
      });
      // console.table(chatBox);
      // const messages = await this._messageRepository.find({

      //   order: { createDateTime: 'DESC' },
      // });
      return messages;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'MESS_NOT_SEEN',
      });
    }
  }

  public async getMessageById(token: string, _id: string, messageId: string): Promise<MessageEntity> {
    try {
      await this.findUser(token);
      await this.findBoxChat(_id);

      const message = await this._messageRepository.findOneOrFail({ where: { id: messageId } });
      // console.log('message:: ', message);
      return message;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'MESS_NOT_SEEN',
      });
    }
  }

  public async updateMessage(token: string, _id: string, messageId: string, payload: CreateMessageDto): Promise<MessageEntity> {
    try {
      await this.findUser(token);
      await this.findBoxChat(_id);

      const message = await this._messageRepository.findOneOrFail({ where: { id: messageId } });
      // console.log('message:: ', message);
      await this._messageRepository.update({ id: messageId }, { ...payload });
      return message;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'Message_NOT_FOUND',
      });
    }
  }

  public async deleteMessage(token: string, _id: string, messageId: string): Promise<unknown> {
    try {
      await this.findUser(token);
      await this.findBoxChat(_id);
      const message = await this._messageRepository.findOneOrFail({ where: { id: messageId } });
      // console.log('message:: ', message);
      await this._messageRepository.delete({ id: messageId });
      //res

      const res = this._response.createResponse(200, 'Delete message success', {});
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'Message_NOT_FOUND',
      });
    }
  }

  public async searchMessageLikeContent(token: string, content: string): Promise<MessageEntity[]> {
    try {
      await this.findUser(token);

      const messages = await this._messageRepository.find({
        // where: { contentMessage: ILike(content) },
        order: { createDateTime: 'ASC' },
        take: 15,
      });
      return messages;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'Message_NOT_FOUND',
      });
    }
  }

  private async findBoxChat(_id: string): Promise<ChatBoxEntity> {
    try {
      // check id
      const chatbox = await this._chatBoxRepository.findOneOrFail({ where: { id: _id } });
      if (!chatbox)
        throw new ErrorResponse({
          ...new BadRequestException('Chat box is not exist'),
          errorCode: 'BoxChat_NOT_FOUND',
        });
      return chatbox;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'BoxChat_NOT_FOUND',
      });
    }
  }

  private async findUser(token: string): Promise<UserEntity> {
    try {
      if (!token) {
        throw new ErrorResponse({
          ...new BadRequestException('Token is required'),
          errorCode: 'TOKEN_REQUIRED',
        });
      }
      const account = await this._accountRepository.findOne({ where: { accessToken: token } });
      if (!account) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exist'),
          errorCode: 'ACCOUNT_NOT_EXIST',
        });
      }
      // console.log('_id:: ', _id)
      const user = await this._userRepository.findOne({ where: { id: account.userId } });
      if (!user) {
        throw new ErrorResponse({
          ...new BadRequestException('User is not exist'),
          errorCode: 'USER_NOT_EXIST',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'FIND_USER_BY_ID_ERROR',
      });
    }
  }
}
