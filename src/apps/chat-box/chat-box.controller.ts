import { Body, Controller, Post, Headers, UsePipes, Param, Query, Get, Delete, Put } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import _ from 'underscore';
import { ChatBoxService } from './chat-box.service';
import { MessageService } from '../messages/message.service';
import { CreateMessageDto } from '../messages/dtos';

@Controller('chat')
export class ChatBoxController {}
