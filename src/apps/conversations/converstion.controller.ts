import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async create(@Body() userId: string[], @Headers() _headers: any) {
    return await this.conversationService.createConversation(userId);
  }

  @Post('groups')
  async createGroup(@Body() dto: any, @Headers() _headers: any) {
    // console.log('dto', dto)
    return await this.conversationService.createGroup(dto.adminId, dto.userId, dto.groupName);
  }
  @Get('groups/:id')
  async getGroup(@Param('id') id: string, @Headers() _headers: any) {
    return await this.conversationService.getReqList(id);
  }

  @Put('groups/:id')
  async updateGroup(@Param('id') id: string, @Body() req: any, @Headers() _headers: any) {}

  @Get('users/:id')
  async getAllByUser(@Param('id') id: string, @Headers() _headers: any) {
    return await this.conversationService.getAllByUser(id);
  }
}
