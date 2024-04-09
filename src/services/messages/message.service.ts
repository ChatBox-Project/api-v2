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
    private readonly _response: ResponseService,
  ) {}

  public async createMessage(_id: string, message: CreateMessageDto): Promise<unknown> {
    try {
      // check id
      const chatbox = await this._chatBoxRepository.findOneOrFail({ where: { id: _id } });
      // console.log('checkIDChatbox:: ', checkIDChatbox);
      const saveMessage = await this._messageRepository.create({
        ...message,
        senderId: chatbox.sender_id,
        receiverId: chatbox.receiver_id,
        chatBox: chatbox,
      });
      await this._messageRepository.save(saveMessage);

      // Update user's chat box
      chatbox.message = [...(chatbox.message || []), saveMessage];
      const test = await this._chatBoxRepository.save(chatbox);  
      console.log('test:: ', test);

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
  public async saveMessage(message: MessageEntity) {}
  public async getMessages(): Promise<MessageEntity[]> {
    return await this._messageRepository.find();
  }
}
