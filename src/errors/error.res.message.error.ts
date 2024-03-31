import { HttpException, HttpStatus } from '@nestjs/common';
import { IResponseError } from './interface';

export class ErrorResponse extends HttpException {
  constructor(err?: IResponseError) {
    super(err || '', HttpStatus.BAD_REQUEST);
    this.errorCode = err.errorCode;
  }
  errorCode: string;
}
