import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountRepository } from 'src/repositories';
import { UserRegisterDto, checkUsername } from 'src/validators';
import { AccountService } from '../users/user.service';
import { ErrorResponse } from 'src/errors';
import { UserBaseEntity } from 'src/entities/user.base.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    private readonly _accountService: AccountService,
  ) {}
  public async login() {
    console.log('Login...');
  }

  public async register(_accountRegister: UserRegisterDto, _header: any): Promise<unknown> {
    try {
      const data = await this._accountService.getAccountByUsername(_accountRegister.username);

      if (data) {
        throw new ErrorResponse({
          ...new BadRequestException('Username is exist'),
          errorCode: 'USERNAME_EXIST',
        });
      } else {
        if (checkUsername(_accountRegister.username)) {
          return this.createAccount(_accountRegister, true);
        }
      }
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'REGISTER_FAIL',
      });
    }

    // check username is not exist
    // check before req register form app or web

    return {};
  }
  private async createAccount(_accountRegister: UserRegisterDto, isApp: boolean): Promise<boolean> {
    try {
      const { username, password } = _accountRegister;
      const salt = await bcrypt.genSalt(10);
      const hasdPassword = await bcrypt.hash(password, salt);

      const newUser = await this._accountRepository.create({
        ..._accountRegister,
        password: hasdPassword,
      });

      console.log(newUser);
      if (newUser) {
      }
    } catch (error) {}

    return true;
  }
}
