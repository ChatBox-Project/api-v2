import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/common/entities/account.entity';
import { ErrorResponse } from 'src/errors';

import { ResponseService } from '../../../common/res';
import { UserEntity } from 'src/common/entities/user.base.entity';
import { AccountRepository } from '../account.repository';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
    private readonly _response: ResponseService,
  ) {}

  public async createUser(_userDto: CreateUserDto, token: string): Promise<unknown> {
    try {
      const foundAccount = await this.findAccountByToken(token);

      const createUser = this._userRepository.create({
        ..._userDto,
        accounts: foundAccount,
      });

      if (!createUser) {
        throw new ErrorResponse({
          ...new BadRequestException('User not created'),
          errorCode: 'USER_NOT_CREATED',
        });
      }

      const savedUser = await this._userRepository.save(createUser);

      const metadata = { user: savedUser };
      const res = this._response.createResponse(200, 'update success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'USER_NOT_FOUND',
      });
    }
  }

  public async getUser(token: string): Promise<unknown> {
    try {
      const holderAccount = await this.findAccountByToken(token);
      // console.log('holderAccount:: ', holderAccount);
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account not found'),
          errorCode: 'ACCOUNT_NOT_FOUND',
        });
      }

      const holderUser = await this.getUserByAccountId(holderAccount.userId);

      const metadata = { user: holderUser };
      return this._response.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'USER_NOT_FOUND',
      });
    }
  }

  public async updateUser(_userDto: UpdateUserDto, _header: any): Promise<unknown> {
    try {
      const holderAccount = await this._accountRepository.findOne({ where: { accessToken: _header.token } });
      // console.log('holderAccount:: ', holderAccount)
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account not found'),
          errorCode: 'ACCOUNT_NOT_FOUND',
        });
      }

      // find user
      const holderUser = await this._userRepository.findOne({ where: { id: holderAccount.userId } });
      if (!holderUser) {
        throw new ErrorResponse({
          ...new BadRequestException('User not found'),
          errorCode: 'USER_NOT_FOUND',
        });
      }
      // update user
      const updatedUser = await this._userRepository.update(holderUser.id, { ..._userDto });

      //check updated user
      if (!updatedUser) {
        throw new ErrorResponse({
          ...new BadRequestException('Update failed'),
          errorCode: 'UPDATE_FAILED',
        });
      }

      const metadata = { user: _header.token };
      const res = this._response.createResponse(200, 'success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'UPDATE_FAILED',
      });
    }
  }

  public async getUserById(token: string, userId: string): Promise<unknown> {
    try {
      await this.findAccountByToken(token);
      const user = await this._userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new ErrorResponse({
          ...new BadRequestException('User not found'),
          errorCode: 'USER_NOT_FOUND',
        });
      }
      const metadata = { user };
      return this._response.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'USER_NOT_FOUND',
      });
    }
  }

  // add friend
  // public async addFriend(token: string, friendId: string): Promise<unknown> {
  //   try {
  //     // check token
  //     if (!token) {
  //       throw new ErrorResponse({
  //         ...new BadRequestException('Invalid token'),
  //         errorCode: 'INVALID_TOKEN',
  //       });
  //     }
  //     // check friendId
  //     if (!isUUID(friendId)) {
  //       throw new Error('Invalid friendId');
  //     }

  //     // find account
  //     const holderAccount = await this._accountRepository.findOne({ where: { accessToken: token } });
  //     // console.log('holderAccount:: ', holderAccount)
  //     if (!holderAccount) {
  //       throw new ErrorResponse({
  //         ...new BadRequestException('Account not found'),
  //         errorCode: 'ACCOUNT_NOT_FOUND',
  //       });
  //     }
  //     // console.log('holderAccount:: ', holderAccount)
  //     // console.log('friendId:: ', friendId)

  //     // find user
  //     const holderUser = await this._userRepository.findOne({ where: { id: holderAccount.userId } });
  //     // console.log('holderUser:: ', holderUser)

  //     if (!holderUser) {
  //       throw new ErrorResponse({
  //         ...new BadRequestException('User not found'),
  //         errorCode: 'USER_NOT_FOUND',
  //       });
  //     }

  //     // check friend

  //     // console.log('friendUser:: ', friendUser);

  //     // add friend

  //     if (!friendUser) {
  //       throw new ErrorResponse({
  //         ...new BadRequestException('Add friend failed'),
  //         errorCode: 'ADD_FRIEND_FAILED',
  //       });
  //     }

  //     // const metadata = { user: addedFriend };
  //     // const res = this._response.createResponse(200, 'Add friend success', metadata);
  //     // return res;

  //     return;
  //   } catch (error) {
  //     throw new ErrorResponse({
  //       ...new BadRequestException(error.message),
  //       errorCode: 'ADD_FRIEND_FAILED',
  //     });
  //   }
  // }

  private async findAccountByToken(token: string): Promise<AccountEntity> {
    // Check token
    if (!token) {
      throw new ErrorResponse({
        ...new BadRequestException('Invalid token'),
        errorCode: 'INVALID_TOKEN',
      });
    }
    const account = await this._accountRepository.findOne({ where: { accessToken: token } });
    if (!account) {
      throw new ErrorResponse({
        ...new BadRequestException('User not found'),
        errorCode: 'USER_NOT_FOUND',
      });
    }
    return account;
  }

  private async getUserByAccountId(accountId: string): Promise<UserEntity> {
    // Check token
    if (!accountId) {
      throw new ErrorResponse({
        ...new BadRequestException('Invalid token'),
        errorCode: 'INVALID_TOKEN',
      });
    }
    const user = await this._userRepository.findOne({ where: { id: accountId } });
    if (!user) {
      throw new ErrorResponse({
        ...new BadRequestException('User not found'),
        errorCode: 'USER_NOT_FOUND',
      });
    }
    return user;
  }
}
