import { Body, Controller, Post, Headers, UsePipes, Param, Query, Get, Delete, Put } from '@nestjs/common';
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
    return await this._messageService.getChatboxMessages(headers.token, _id);
    // return _.omit(messages, 'messages');
  }

  @Get(':id/messages/:messageId')
  @ApiOkResponse({ description: 'Get message by id' })
  public async getMessage(@Param('id') _id: string, @Param('messageId') messageId: string, @Headers() headers: any) {
    const message = await this._messageService.getMessageById(headers.token, _id, messageId);
    return _.omit(message, 'message');
  }

  @Put(':id/messages/:messageId')
  @ApiOkResponse({ description: 'Update message' })
  public async updateMessage(
    @Param('id') boxChat_id: string,
    @Param('messageId') messageId: string,
    @Body() message: CreateMessageDto,
    @Headers() headers: any,
  ): Promise<unknown> {
    const update = await this._messageService.updateMessage(headers.token, boxChat_id, messageId, message);
    return _.omit(update, 'message');
  }

  @Delete(':id/messages/:messageId')
  @ApiOkResponse({ description: 'Delete message' })
  public async deleteMessage(@Param('id') boxChat_id: string, @Param('messageId') messageId: string, @Headers() headers: any) {
    const deleteMessage = await this._messageService.deleteMessage(headers.token, boxChat_id, messageId);
    return _.omit(deleteMessage, 'message');
  }

  @Get('search')
  @ApiOkResponse({ description: 'Search message' })
  public async searchMessage(@Query('message') message: any, @Headers() headers: any) {
    console.log('query:: ', message);
    const search = await this._messageService.searchMessageLikeContent(headers.token, message);
    return _.omit(search, 'message');
  }
}
