import { Logger, OnModuleInit } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientMessage } from './interface/message.events';
import { MessageEntity } from 'src/common/entities';
@WebSocketGateway(3030)
export class Gateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
  // Logger
  private readonly logger = new Logger(Gateway.name);

  // Server
  @WebSocketServer() server: Server;

  sendMessage(message: MessageEntity, to: string) {
    try {
      console.log(to)
      this.server.emit('message', message);
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      throw error;
    }
  }

  getMessage() {}

  getChat() {}
  // OnModuleInit
  onModuleInit() {
    this.logger.log('Gateway is ready');
  }

  // OnGatewayConnection
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // OnGatewayDisconnect
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // SubscribeMessage
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: ServerToClientMessage) {
    this.server.emit('message', data);
  }
}
