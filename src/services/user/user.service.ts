import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { ErrorResponse } from 'src/errors';
import { AccountRepository, UserRepository } from 'src/repositories';
import { CreateUserDto, UpdateUserDto } from 'src/validators';
import { ResponseService } from '../res';
import { UserEntity } from 'src/entities/user.base.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
    private readonly _response: ResponseService,
  ) {}

  public async createUser(_userDto: CreateUserDto, _header: any): Promise<unknown> {
    try {
      // check token
      // console.log('params:: ', _header);
      if (_header?.token === undefined) {
        throw new ErrorResponse({
          ...new BadRequestException('Invalid token'),
          errorCode: 'INVALID_TOKEN',
        });
      }
      // console.log('header:: ', _header.token);

      const foundAccount = await this._accountRepository.findOne({ where: { accessToken: _header.token } });
      // console.log('user:: ', user)
      if (!foundAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('User not found'),
          errorCode: 'USER_NOT_FOUND',
        });
      }

      const existingUser = await this._userRepository.findOne({ where: { id: foundAccount.userId } });
      // console.log('existingUser:: ', existingUser);

      if (existingUser) {
        // Update existing user
        await this._userRepository.update(existingUser.id, _userDto);
        return this._response.createResponse(200, 'Update user success');
      } else {
        // Create a new user
        const newUser = await this._userRepository.create({ ..._userDto });
        await this._userRepository.save(newUser);

        // Update the AccountEntity's user_id reference
        await this._accountRepository.update(foundAccount.id, { userId: newUser.id });
      }

      const updatedAccount = await this._accountRepository.findOne({ where: { accessToken: _header.token } });
      // console.log('updatedAccount:: ', updatedAccount);

      const metadata = { user: updatedAccount };
      const res = this._response.createResponse(200, 'update success', metadata);
      return res;
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'USER_NOT_FOUND',
      });
    }
  }

  // get

  public async getUser(token: string): Promise<unknown> {
    try {
      // check token
      if (!token) {
        throw new ErrorResponse({
          ...new BadRequestException('Invalid token'),
          errorCode: 'INVALID_TOKEN',
        });
      }
      // found account

      const holderAccount = await this._accountRepository.findOne({
        where: {
          accessToken: token,
        },
      });
      console.log('holderAccount:: ', holderAccount);
      if (!holderAccount) {
        throw new ErrorResponse({
          ...new BadRequestException('Account not found'),
          errorCode: 'ACCOUNT_NOT_FOUND',
        });
      }
      const holderUser = await this._userRepository.findOne({ where: { id: holderAccount.userId } });

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
      // console.log('userDto:: ', _header);
      // check token
      if (!_header.token) {
        throw new ErrorResponse({
          ...new BadRequestException('Invalid token'),
          errorCode: 'INVALID_TOKEN',
        });
      }
      // find account
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
}
