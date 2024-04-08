import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity, ChatBoxEntity, UserEntity } from 'src/entities/';
import { AccountRepository, ChatBoxRepository, UserRepository } from 'src/repositories';
import { ResponseService } from '../res';
import { ErrorResponse } from 'src/errors';

@Injectable()
export class ChatBoxService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
    @InjectRepository(ChatBoxEntity) private readonly _chatBoxRepository: ChatBoxRepository,
    private readonly _response: ResponseService,
  ) {}

  public async createChatBox(token: string, _id: string): Promise<unknown> {
    try {
      // Find user by token
      const foundUser = await this.findUser(token);

      if (foundUser && Array.isArray(foundUser.chatBox)) {
        const chatBoxExists = foundUser.chatBox.some((chatBox) => chatBox.id === _id);
        if (chatBoxExists) {
          throw new ErrorResponse({
            ...new BadRequestException('Chat box is exist'),
            errorCode: 'CHAT_BOX_IS_EXIST',
          });
        }
      }
      // create chatbox
      const newChat = await this._chatBoxRepository.create({
        chatBoxName: foundUser.name,
        sender_id: foundUser.id,
        receiver_id: _id,
      });
      await this._chatBoxRepository.save({ ...newChat, user: [foundUser] });

      foundUser.chatBox.push(newChat);
      await this._userRepository.save(foundUser);
      const metadata = { newChat };
      const res = await this._response.createResponse(200, 'Create chat box success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'CREATE_CHAT_BOX_ERROR',
      });
    }
  }

  public async getChatBox(token: string): Promise<unknown> {
    try {
      // Find user by token
      const foundUser = await this.findUser(token);
      const chatBox = await this._chatBoxRepository.find({
        where: [{ sender_id: foundUser.id }, { receiver_id: foundUser.id }],
        take: 10,
      });
      const metadata = { chatBox };
      const res = await this._response.createResponse(200, 'Get chat box success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'GET_CHAT_BOX_ERROR',
      });
    }
  }

  public async getChatBoxById(token: string): Promise<unknown> {
    try {
      // Find user by token
      const foundUser = await this.findUser(token);
      const chatBox = await this._chatBoxRepository.findOne({ where: { sender_id: foundUser.id } });
      if (!chatBox) {
        throw new ErrorResponse({
          ...new BadRequestException('Chat box is not exist'),
          errorCode: 'CHAT_BOX_NOT_EXIST',
        });
      }
      const metadata = { chatBox };
      const res = await this._response.createResponse(200, 'Get chat box by id success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'GET_CHAT_BOX_BY_ID_ERROR',
      });
    }
  }

  public async deleteChatBox(token: string): Promise<unknown> {
    try {
      // Find user by token
      const foundUser = await this.findUser(token);
      const chatBox = await this._chatBoxRepository.findOne({ where: { sender_id: foundUser.id } });
      if (!chatBox) {
        throw new ErrorResponse({
          ...new BadRequestException('Chat box is not exist'),
          errorCode: 'CHAT_BOX_NOT_EXIST',
        });
      }
      await this._chatBoxRepository.delete({ id: chatBox.id });
      const metadata = { chatBox };
      const res = await this._response.createResponse(200, 'Delete chat box success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'DELETE_CHAT_BOX_ERROR',
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
