import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageEntity } from 'src/entities/message.entity';
import { MessageService } from '../messages';
@Injectable()
export class AppGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  constructor(private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  // @SubscribeMessage('sendMessage')
  public async handleSendMessage(client: Socket, payload: MessageEntity): Promise<void> {
    await this.messageService.saveMessage(payload);
    this.server.emit('sendMessage', payload);
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
