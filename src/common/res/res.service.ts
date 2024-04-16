import { Injectable } from '@nestjs/common';
import { ConversationDocument } from '../models/conversation.model';
interface IResponseService {
  status: number;
  message: string;
  metadata?: {};
}
@Injectable()
export class ResponseService {
  createResponse(status: number, message: string, metadata?: object): IResponseService {
    return { status, message, metadata };
  }
}
