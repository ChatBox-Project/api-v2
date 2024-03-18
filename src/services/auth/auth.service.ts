import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountRepository } from 'src/repositories';
import { UserRegisterDto, isValidEmail, isValidNumberPhone } from 'src/validators';
import { AccountService } from '../users/user.service';
import { ErrorRespone } from 'src/errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity) _accountRepository: AccountRepository,
    private readonly _accountService: AccountService,
  ) {}
  public async login() {
    console.log('Login...');
  }

  public async register(_userRegister: UserRegisterDto, _header: any): Promise<unknown> {
    const { username, password, firstName, lastName, email } = _userRegister;

    let data = null;

    // check username is not exist
    // check before req register form app or web

    if (_header?.isapp === 'true' || _header?.isapp === true) {
      data = await this._accountService.getAccountByUsername(username);
    }

    if (data) {
      throw new ErrorRespone({
        ...new BadRequestException('Username is exist'),
        errorCode: 'USERNAME_EXIST',
      });
    } else {
      if (_header?.isapp === 'true' || _header?.isapp === true) {
        
      }
    }

    return {};
  }


}
