import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountRepository } from 'src/repositories';
import { UserRegisterDto } from 'src/validators';
import { AccountService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity) _accountRepository: AccountRepository,
    private readonly _accountService: AccountService,
  ) {}
  public async login() {
    console.log('Login...');
  }

  public async register(
    _userRegister: UserRegisterDto,
    _header: any,
  ): Promise<unknown> {
    const { username, password, firstName, lastName, email } = _userRegister;

    let data = null;

    // check username is not exist
    // check before req register form app or web

    if (_header?.isapp === 'true' || _header?.isapp === true) {
      data = await this._accountService.getAccountByUsername(username);
    }
    return {};
  }
}
