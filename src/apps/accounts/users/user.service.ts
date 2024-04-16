import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities/account.entity';
import { ErrorResponse } from 'src/errors';

import { ResponseService } from '../../../common/res';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from 'src/common';
import { AccountRepository } from '../account.repository';
import { User, UserDocument } from 'src/common/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountEntity) private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly _response: ResponseService,
  ) {}
  private async findAccountByToken(token: string) {
    // console.log('token', token)
    const account = await this.accountRepository.findOne({ where: { accessToken: token } });
    // console.log('account', account)
    return account;
  }

  public async create(token: string, createUserDto: CreateUserDto) {
    try {
      const holderAccount = await this.findAccountByToken(token);
      // console.log('holderAccount', holderAccount)
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const user = await this.userModel.create({
        name: createUserDto.name,
        gender: createUserDto.gender,
        avatarUrl: createUserDto.avatarUrl,
        birth_day: createUserDto.birth_day,
        accountId: holderAccount.id,
      });
      console.log('user', user);
      const metadata = { user: user };
      const res = this._response.createResponse(200, 'update success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'CREATE_USER_FAIL',
      });
    }
  }
  public async getUserId(token: string) {
    try {
      const holderAccount = await this.findAccountByToken(token);

      if (!holderAccount) {
        throw new ErrorResponse({
          ...new NotFoundException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }

      const user = await this.userModel.findOne({ accountId: holderAccount.id });
      // console.log('user', user)

      return this._response.createResponse(200, 'success', user);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_USER_FAIL',
      });
    }
  }
  // bug
  public async updateUser(token: string, updateUserDto: UpdateUserDto) {
    try {
      const holderAccount = await this.findAccountByToken(token);

      if (!holderAccount) {
        throw new ErrorResponse({
          ...new NotFoundException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }

      const user = await this.userRepository.findOneAndUpdate(holderAccount.id, { ...updateUserDto });

      return this._response.createResponse(200, 'success', user);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'UPDATE_USER_FAIL',
      });
    }
  }
}
