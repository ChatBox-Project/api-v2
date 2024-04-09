import { Body, Controller, Post, Headers, UsePipes, Param, Query, Get, Delete } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ChatBoxService, MessageService } from 'src/services';
import { CreateMessageDto } from 'src/validators';
import _ from 'underscore';

@Controller('chat')
export class ChatBoxController {
  constructor(
    private readonly _chatBoxService: ChatBoxService,
    private readonly _messageService: MessageService,
  ) {}

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
    const chatBox = await this._chatBoxService.getChatBoxById(token, _id);
    return _.omit(chatBox, 'chatbox');
  }

  @Post(':id/messages')
  @ApiOkResponse({ description: 'Create message' })
  public async createMessage(@Param('id') _id: string, @Body() message: CreateMessageDto, @Headers() headers: any) {
    const create = await this._messageService.createMessage(headers.token, _id, message);
    return _.omit(create, 'message');
  }

  @Get(':id/messages')
  @ApiOkResponse({ description: 'Get chat box messages' })
  public async getChatboxMessages(@Param('id') _id: string, @Headers() headers: any) {
    const messages = await this._messageService.getChatboxMessages(headers.token, _id);
    return _.omit(messages, 'messages');
  }

  // @Post(':id/messages/')
  // @ApiOkResponse({ description: 'Get message by id' })
  // public async send(@Param('id') _id: string, @Par('receiver_id') receiver_id: string, @Headers() headers: any, payload: CreateMessageDto) {
  //   const message = await this._messageService.sendMessage(headers.token, _id, receiver_id, payload);
  //   return _.omit(message, 'message');
  // }
}
