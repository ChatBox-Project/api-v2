import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { IResponseError } from './interface';
import { Response, Request } from 'express';

@Catch()
export class FilterException implements ExceptionFilter {
  catch(error: IResponseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (error instanceof HttpException) {
      response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: error.message,
        error: error.message,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        method: request.method,
        message: error.message,
        error: error.message,
      });
    }
  }
}
