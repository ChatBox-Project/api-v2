import { HttpException, HttpStatus } from '@nestjs/common';

interface IErrorRes extends Error {
  errorCode: string;
}

export class ErrorRespone extends HttpException {
  constructor(err?: IErrorRes) {
    super(err || '', HttpStatus.BAD_REQUEST);
    this.errorCode = err.errorCode;
  }
  errorCode: string;
}
