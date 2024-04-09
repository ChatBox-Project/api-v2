import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageEntity } from 'src/entities/message.entity';
import { MessageService } from '../messages';
@Injectable()
export class AppGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  chatBoxService: any;
  constructor(private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  // @SubscribeMessage('sendMessage')
  // public async handleSendMessage(client: Socket, payload: MessageEntity): Promise<void> {
  //   await this.messageService.saveMessage(payload);
  //   this.server.emit('sendMessage', payload);
  // }

  @SubscribeMessage('createChatBox')
  public async handleCreateChatBox(client: Socket, data: { token: string; _id: string }): Promise<void> {
    try {
      const { token, _id } = data;
      const res = await this.chatBoxService.createChatBox(token, _id);
      client.emit('createChatBox', res);
    } catch (error) {
      client.emit('error', error);
    }
  }

  @SubscribeMessage('getChatBox')
  public async handleGetChatBox(client: Socket, token: string): Promise<void> {
    try {
      const res = await this.chatBoxService.getChatBox(token);
      client.emit('getChatBox', res);
    } catch (error) {
      client.emit('error', error);
    }
  }

  // @SubscribeMessage('getChatBoxById')
  // public async handleGetChatBoxById(client: Socket, _id: string): Promise<void> {
  //   try {
  //     const res = await this.chatBoxService.getChatBoxById(_id);
  //     client.emit('getChatBoxById', res);
  //   } catch (error) {
  //     client.emit('error', error);
  //   }
  // }

  @SubscribeMessage('deleteChatBox')
  public async handleDeleteChatBox(client: Socket, data: { token: string; _id: string }): Promise<void> {
    try {
      const { token, _id } = data;
      const res = await this.chatBoxService.deleteChatBox(token, _id);
      client.emit('deleteChatBox', res);
    } catch (error) {
      client.emit('error', error);
    }
  }

  private users: number = 0;

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.users++;
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('users', this.users);
  }

  handleDisconnect(client: Socket) {
    this.users--;
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit('users', this.users);
  }
}
