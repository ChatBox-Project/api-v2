import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Request...');
    next();
  }
}
