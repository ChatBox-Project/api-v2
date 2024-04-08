import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@Injectable()
export class AppGateWay implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() server: Server;

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
