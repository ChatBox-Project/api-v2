import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity, ChatBoxEntity, MessageEntity, UserEntity } from 'src/entities/';
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
      // console.log('foundUser:: ', foundUser);
      // find chatbox in foundUser

      const checkIdReceiver = await this._userRepository.findOneOrFail({ where: { id: _id } });
      // console.log('checkIdReceiver:: ', checkIdReceiver);

      const existingChatBox = await this._chatBoxRepository.findOne({ where: { user1_id: foundUser.id, user2_id: _id } });
      if (existingChatBox) {
        throw new ErrorResponse({
          ...new BadRequestException('Chat box already exists'),
          errorCode: 'CHAT_BOX_ALREADY_EXISTS',
        });
      }

      // Create chat box
      const createChatbox = this._chatBoxRepository.create({
        user1_id: foundUser.id,
        user2_id: _id,
        chatBoxName: `${foundUser.name} - ${checkIdReceiver.name}`,
      });
      await this._chatBoxRepository.save(createChatbox);
      //  create Message

      // Update user's chat box
      foundUser.chatBox = [...(foundUser.chatBox || []), createChatbox];
      await this._userRepository.save(foundUser);

      const metadata = { chatBox: createChatbox };
      const res = await this._response.createResponse(200, 'Create chat box success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'CREATE_CHAT_BOX_ERROR',
      });
    }
  }
  public async searchBoxByNameUser() {}
  public async getChatBox(token: string): Promise<unknown> {
    try {
      // Find user by token
      const foundUser = await this.findUser(token);
      const chatBox = await this._chatBoxRepository.find({
        where: [{ user1_id: foundUser.id }, { user2_id: foundUser.id }],
        order: { lastChangedDateTime: 'DESC' },
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

  public async getChatBoxById(token: string, _id: string): Promise<unknown> {
    try {
      // find user

      const chatBox = await this._chatBoxRepository.findOne({ where: { id: _id } });
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

  public async deleteChatBox(token: string, _id: string): Promise<unknown> {
    try {
      // Find user by token
      await this.findUser(token);
      // Find chat box by ID
      const chatBox = await this._chatBoxRepository.findOne({ where: { id: _id } });
      if (!chatBox) {
        throw new ErrorResponse({
          ...new BadRequestException('Chat box does not exist'),
          errorCode: 'CHAT_BOX_NOT_EXIST',
        });
      }

      // Delete chat box
      await this._chatBoxRepository.delete({ id: chatBox.id });
      const metadata = {};
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
