import { Body, Controller, Headers, Post } from '@nestjs/common';

import { CreateMessageDto } from 'src/validators';
import _ from 'underscore';
import { MessageService } from './message.service';
@Controller('message')
export class MessageController {
  constructor(private _messageService: MessageService) {}

  // @Post()
  // public async saveMessage(@Headers() _headers: any, @Body() _message: CreateMessageDto): Promise<unknown> {
  //   const message = await this._messageService.createMessage(_headers.token, _message);
  //   return _.omit(message, 'message');
  // }
}