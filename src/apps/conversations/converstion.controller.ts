import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
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
    console.log('id', id)
    return await this.conversationService.getReqList(id);
  }
}
