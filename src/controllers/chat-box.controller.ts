import { Body, Controller, Post, Headers, UsePipes, Param, Query, Get, Delete } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ChatBoxService } from 'src/services';
import _ from 'underscore';

@Controller('chat')
export class ChatBoxController {
  constructor(private readonly _chatBoxService: ChatBoxService) {}

  // crud
  @Post(':id')
  @ApiOkResponse({ description: 'Create chat box' })
  public async createChatBox(@Headers('token') token: string, @Param('id') id: string) {
    const create = await this._chatBoxService.createChatBox(token, id);
    return _.omit(create, 'chatbox');
  }

  @Get()
  @ApiOkResponse({ description: 'Gets chat box' })
  public async getChatBoxs(@Headers('token') token: string) {
    const chatBox = await this._chatBoxService.getChatBox(token);
    return _.omit(chatBox, 'chatbox');
  }

  @ApiOkResponse({ description: 'Delete chat box' })
  @Delete(':id')
  public async deleteChatBox(@Headers('token') token: string, @Param('id') _id: string) {
    const deleteChatBox = await this._chatBoxService.deleteChatBox(token, _id);
    return _.omit(deleteChatBox, 'chatbox');
  }

  @ApiOkResponse({ description: 'Get chat box by id' })
  @Get(':id')
  public async getChatBoxById(@Param('id') _id: string, @Headers('token') token: string) {
    const chatBox = await this._chatBoxService.deleteChatBox(token, _id);
    return _.omit(chatBox, 'chatbox');
  }
}
