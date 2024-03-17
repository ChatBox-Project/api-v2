import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  public async login() {
    console.log('Login...');
  }

  public async register(userRegister: any) {
    console.log(userRegister);
  }
}
