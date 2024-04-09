import { BadRequestException, Body, Headers, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatBoxEntity } from 'src/entities';
import { AccountEntity } from 'src/entities/account.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.base.entity';
import { ErrorResponse } from 'src/errors';
import { AccountRepository, ChatBoxRepository, MessageRepository, UserRepository } from 'src/repositories';
import { CreateMessageDto } from 'src/validators';
import { ResponseService } from '../res';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly _messageRepository: MessageRepository,
    @InjectRepository(ChatBoxEntity) private readonly _chatBoxRepository: ChatBoxRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    private readonly _response: ResponseService,
  ) {}

  public async createMessage(_token: string, _id: string, payload: CreateMessageDto): Promise<unknown> {
    try {
      // check id
      const chatbox = await this._chatBoxRepository.findOneOrFail({ where: { id: _id } });
      console.log('chatbox before:: ', chatbox.message);

      // console.log('checkIDChatbox:: ', checkIDChatbox);
      const saveMessage = await this._messageRepository.create({
        ...payload,
        senderId: chatbox.sender_id,
        receiverId: chatbox.receiver_id,
        chatBox: chatbox,
      });
      await this._messageRepository.save(saveMessage);

      // Update user's chat box
      chatbox.message = [...(chatbox.message || []), saveMessage];
      console.log('chatbox:: ', chatbox.message);
      await this._chatBoxRepository.save(chatbox);
      // console.log('test:: ', test);

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

  // public async sendMessage(token: string, _id: string, receiver_id: string, payload: CreateMessageDto) {
  //   try {
  //     //check token
  //     const holderUser = await this.findUser(token);
  //     console.log('holderUser:: ', holderUser);
  //     // check box
  //     const holderChatBox = await this._chatBoxRepository.findOneOrFail({ where: { id: _id } });
  //     console.log('holderChatBox:: ', holderChatBox);

  //     const holderRecipient = await this._userRepository.findOneOrFail({ where: { id: receiver_id } });
  //     console.log('holderRecipient:: ', holderRecipient);

  //     // find chatbox
  //   } catch (error) {
  //     throw new ErrorResponse({
  //       ...new BadRequestException(error.message),
  //       errorCode: 'MESS_NOT_SEEN',
  //     });
  //   }3
  // }

  async getChatboxMessages(token: string, _id: string): Promise<MessageEntity[]> {
    try {
      await this.findUser(token);

      const holderChatBox = await this._chatBoxRepository.findOneOrFail({ where: { id: _id } });
      // console.log('holderChatBox:: ', holderChatBox);
      // check sender and receiver

      const messages = await this._messageRepository.find({
        where: { senderId: holderChatBox.sender_id, receiverId: holderChatBox.receiver_id },
        order: { createDateTime: 'ASC' },
        take: 15,
      });
      // console.log('messages:: ', messages);

      return messages;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'MESS_NOT_SEEN',
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
