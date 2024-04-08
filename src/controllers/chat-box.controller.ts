import { Body, Controller, Post, Headers, UsePipes, Param, Query } from '@nestjs/common';
import { ChatBoxService } from 'src/services';
import _ from 'underscore';

@Controller('chat')
export class ChatBoxController {
  constructor(private readonly _chatBoxService: ChatBoxService) {}

  // crud
  @Post(':id')
  public async createChatBox(@Headers('token') token: string, @Param('id') id: string) {
    const create = await this._chatBoxService.createChatBox(token, id);
    return _.omit(create, 'chatbox');
  }
}
