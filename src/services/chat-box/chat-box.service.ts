import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatBoxService {
  constructor() {}

  public async createChatBox(token: string, id: string) {
    console.log(token, id);
  }
}
