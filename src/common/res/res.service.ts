import { Injectable } from '@nestjs/common';
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
