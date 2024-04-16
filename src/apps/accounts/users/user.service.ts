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
  public async findAccountByToken(token: string) {
    // console.log('token', token)
    const account = await this.accountRepository.findOne({ where: { accessToken: token } });
    // console.log('account', account)
    return account;
  }
  public async findUserByAccountId(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ accountId: id });
  }

  private async updateFriendStatus(user: UserDocument, friendId: string, status: string): Promise<UserDocument> {
    const updatedUser = await this.userModel.aggregate([
      {
        $match: { _id: user._id },
      },
      {
        $project: {
          friends: {
            $map: {
              input: '$friends',
              as: 'friend',
              in: {
                $cond: [{ $eq: ['$$friend.user_id', friendId] }, { $mergeObjects: ['$$friend', { status: status }] }, '$$friend'],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          friends: 1,
        },
      },
    ]);
    return updatedUser[0];
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

      // console.log('user', user);
      const metadata = { user };
      const res = this._response.createResponse(200, 'update success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'CREATE_USER_FAIL',
      });
    }
  }

  public async getUserByToken(token: string) {
    try {
      const account = await this.findAccountByToken(token);

      if (!account) {
        return new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const user = await this.userModel.findOne({ accountId: account.id });
      console.log('user', user);
      if (user === null) {
        const metadata = { user: null };
        return this._response.createResponse(400, 'Dont update userprofile', metadata);
      }
      const metadata = { user };
      return this._response.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Token is not exists'),
        errorCode: 'GET_USER_FAIL',
      });
    }
  }

  public async getUserId(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }).lean();
      if (!user) {
        throw new ErrorResponse({
          ...new NotFoundException('User is not exists'),
          errorCode: 'USER_NOT_EXISTS',
        });
      }
      // console.log('user', user)
      const metadata = { user };
      return this._response.createResponse(200, 'success', metadata);
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

  public async addFriend(token: string, friendId: string): Promise<unknown> {
    try {
      const holderAccount = await this.findAccountByToken(token);
      // console.log('holderAccount', holderAccount);

      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const holderUser = await this.userModel.findOne({ accountId: holderAccount.id });
      console.log('holderUser', holderUser);

      // check friend is exists in holderUser array
      const isFriendExists = holderUser.friends.find((fr) => fr.user_id === friendId);
      // console.log('isFriendExists', isFriendExists);
      if (isFriendExists) {
        throw new ErrorResponse({
          ...new ConflictException('Friend is exists'),
          errorCode: 'FRIEND_IS_EXISTS',
        });
      }
      // add friend
      const friend = await this.userModel.findByIdAndUpdate(
        friendId,
        {
          $push: { friends: { user_id: holderUser.id, status: 'PENDING' } },
        },
        { new: true },
      );
      // console.log('friend', friend);

      const friendHolderUser = await this.userModel.findByIdAndUpdate(
        holderUser.id,
        {
          $push: { friends: { user_id: friendId, status: 'PENDING' } },
        },
        { new: true },
      );

      const metadata = { friend, friendHolderUser };
      return this._response.createResponse(200, 'success', metadata);
      return;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Add friend failed'),
        errorCode: 'ADD_FRIEND_FAILED',
      });
    }
  }
  /* The `// bug` comment is used to indicate that there is a potential bug or issue in the code that
  needs to be addressed. It serves as a marker for the developer to come back and investigate or fix
  the problem at a later time. In this case, it seems like there are identified bugs in the
  `updateUser` and `acceptFriend` methods that need to be resolved. */
  // bug  
  public async acceptFriend(token: string, friendId: string): Promise<unknown> {
    try {
      const holderAccount = await this.findAccountByToken(token);
      // console.log('holderAccount', holderAccount);

      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const user = await this.findUserByAccountId(holderAccount.id);
      // accept friend
      const friend = await this.userModel.findById(friendId);

      const updateUser = await this.updateFriendStatus(user, friendId, 'ACCEPTED');
      const updateFriend = await this.updateFriendStatus(friend, user.id, 'ACCEPTED');

      console.log('updateUser', updateUser);
      console.log('updateFriend', updateFriend);

      return;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Accept friend failed'),
        errorCode: 'ACCEPT_FRIEND_FAILED',
      });
    }
  }
  public async search(token: string, phone: string) {
    try {
      const account = await this.findAccountByToken(token);
      if (!account) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const foundAccount = await this.accountRepository.findOne({ where: { phoneNumber: phone } });
      // console.log('foundAccount', foundAccount);

      if (!foundAccount) {
        new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
        const metadata = { foundUser: null };
        return this._response.createResponse(400, 'Account is not exists', metadata);
      }

      const foundUser = await this.userModel.findOne({ accountId: foundAccount.id });
      // console.log('foundUser', foundUser);

      if (!foundUser) {
        throw new ErrorResponse({
          ...new BadRequestException('User is not exists'),
          errorCode: 'USER_NOT_EXISTS',
        });
      }

      const metadata = { foundUser };
      return this._response.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Search failed'),
        errorCode: 'SEARCH_FAILED',
      });
    }
  }

  public async getListFriends(token: string) {
    try {
      const account = await this.findAccountByToken(token);
      if (!account) {
        throw new ErrorResponse({
          ...new BadRequestException('Account is not exists'),
          errorCode: 'ACCOUNT_NOT_EXISTS',
        });
      }
      const user = await this.findUserByAccountId(account.id);
      // console.log('user', user);

      if (!user) {
        new ErrorResponse({
          ...new BadRequestException('User is not exists'),
          errorCode: 'USER_NOT_EXISTS',
        });
        const metadata = { user: null };
        return this._response.createResponse(400, 'User is not exists', metadata);
      }

      //
      const listFriend = user.friends.filter((fr) => fr.status === 'PENDING');
      // console.log('listFriend', listFriend);
      const metadata = { listFriend };
      return this._response.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Get list friends failed'),
        errorCode: 'GET_LIST_FRIENDS_FAILED',
      });
    }
  }
}
