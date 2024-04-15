// import { InjectModel } from '@nestjs/mongoose';
// import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Model } from 'mongoose';
// import { Server, Socket } from 'socket.io';
// import { Room } from 'src/common/models/chatGroup.model';
// import { Message } from 'src/common/models/message.model';
// import { User } from 'src/common/models/user.model';

// @WebSocketGateway(3030, { namespace: 'chat', cors: '*:*' })
// export class MessageGateway implements OnGatewayDisconnect {
//   constructor(
//     @InjectModel(Message.name) private readonly messagesModel: Model<Message>,
//     @InjectModel(Room.name) private readonly roomsModel: Model<Room>,
//     @InjectModel(User.name) private readonly usersModel: Model<User>,
//   ) {}
//   @WebSocketServer()
//   server: Server;
//   async handleDisconnect(client: Socket) {
//     console.log('Client disconnected: ', client.id);
//   }
// }
