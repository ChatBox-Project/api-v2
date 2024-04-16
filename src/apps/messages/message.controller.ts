import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';

import _ from 'underscore';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos';
@Controller('messages')
export class MessageController {
  constructor(private _messageService: MessageService) {}

  @Post(':id')
  public async saveMessage(@Headers() _headers: any, @Body() _message: any, @Param('id') conversationId: string): Promise<unknown> {
    // console.log('saveMessage', _message,"id::::", conversationId, _headers.token);
    return await this._messageService.save(_headers.token, conversationId, _message);
  }
  @Get(':id')
  public async getAllMessagesInConversation(@Param('id') conversationId: string, @Body() data: any): Promise<unknown> {
    // console.log('getAllMessagesInConversation', conversationId, data);
    return await this._messageService.getMessageByConversationId(conversationId, { ...data });
  }
}
