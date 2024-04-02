import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/validators';

@Injectable()
export class UserService {
  constructor() {}

  public async createUser(user: CreateUserDto, header: any) {
    try {
      
    } catch (error) {}
  }
}
