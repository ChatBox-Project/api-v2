import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageEntity } from 'src/entities/message.entity';
import { MessageService } from '../messages';
import { ChatBoxService } from '../chat-box';
import { AccountEntity, ChatBoxEntity, UserEntity } from 'src/entities';
import { ErrorResponse } from 'src/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRegisterDto } from 'src/validators';
import { AccountRepository, ChatBoxRepository, UserRepository } from 'src/repositories';
@Injectable()
export class AppGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private messageService: MessageService,
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
    @InjectRepository(ChatBoxEntity) private readonly _chatBoxRepository: ChatBoxRepository,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  public async handleMessage(client: Socket, payload: any): Promise<unknown> {
    try {
      const { token, id, data } = payload;

      const sender = await this.authenticateUser(token);

      const message = await this.messageService.createMessage(token, id, data);

      client.broadcast.to(id).emit('newMessage', message);
      return message;
    } catch (error) {
      throw new Error('Failed to send message to chat box.');
    }
  }

  @SubscribeMessage('getMessages')
  public async handleGetMessages(client: Socket, payload: any): Promise<unknown> {
    try {
      const { token, id } = payload;

      const sender = await this.authenticateUser(token);

      const messages = await this.messageService.getChatboxMessages(token, id);

      client.broadcast.to(id).emit('getMessages', messages);
      return messages;
    } catch (error) {
      throw new Error('Failed to get messages from chat box.');
    }
  }

  @SubscribeMessage('getMessage')
  public async handleGetMessage(client: Socket, payload: any): Promise<unknown> {
    try {
      const { token, id, messageId } = payload;

      const sender = await this.authenticateUser(token);

      const message = await this.messageService.getMessageById(token, id, messageId);

      client.broadcast.to(id).emit('getMessage', message);
      return message;
    } catch (error) {
      throw new Error('Failed to get message from chat box.');
    }
  }

  @SubscribeMessage('updateMessage')
  public async handleUpdateMessage(client: Socket, payload: any): Promise<MessageEntity> {
    try {
      const { token, _id, messageId, data } = payload;

      // Kiểm tra xác thực người dùng
      await this.authenticateUser(token);

      // Kiểm tra hộp chat
      await this.findBoxChat(_id);

      // Lấy tin nhắn từ cơ sở dữ liệu
      const message = await this.messageService.updateMessage(token, _id, messageId, data);

      // Gửi tin nhắn đã cập nhật tới tất cả các client trong hộp chat
      client.broadcast.to(_id).emit('updatedMessage', message);

      return message;
    } catch (error) {
      throw new Error('Failed to update message.');
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }
  handleConnection(client: Socket) {
    this.logger.log(`Client ${client.id} connected`);
  }
  afterInit(server: Server) {
    this.logger.log('Gateway initialized');
  }

  private async authenticateUser(token: string): Promise<UserEntity> {
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
}
