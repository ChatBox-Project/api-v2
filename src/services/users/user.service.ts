import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountRepository } from 'src/repositories';
import { ILike } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _accountRepository: AccountRepository,
  ) {}

  async getAccountByUsername(username: string): Promise<AccountEntity> {
    return await this._accountRepository.findOne({
      where: { username: ILike(username) },
    });
  }
}
