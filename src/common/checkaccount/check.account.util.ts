// import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { AccountRepository } from 'src/apps/accounts/account.repository';
// import { UserRepository } from 'src/apps/accounts/users/user.repository';
// import { ChatBoxRepository } from 'src/apps/chat-box/chat-box.entity';
// import { ChatBoxEntity, UserEntity } from 'src/common/entities';
// import { ErrorResponse } from 'src/errors';

// @Injectable()
// export class AccountUtils {
//   constructor(
//     private readonly _chatBoxRepository: ChatBoxRepository,
//     private readonly _userRepository: UserRepository,
//     private readonly _accountRepository: AccountRepository,
//   ) {}
//   async findUser(token: string): Promise<UserEntity> {
//     try {
//       if (!token) {
//         throw new ErrorResponse({
//           ...new BadRequestException('Token is required'),
//           errorCode: 'TOKEN_REQUIRED',
//         });
//       }
//       const account = await this._accountRepository.findOne({ where: { accessToken: token } });
//       if (!account) {
//         throw new ErrorResponse({
//           ...new BadRequestException('Account is not exist'),
//           errorCode: 'ACCOUNT_NOT_EXIST',
//         });
//       }
//       // console.log('_id:: ', _id)
//       const user = await this._userRepository.findOne({ where: { id: account.userId } });
//       if (!user) {
//         throw new ErrorResponse({
//           ...new BadRequestException('User is not exist'),
//           errorCode: 'USER_NOT_EXIST',
//         });
//       }
//       return user;
//     } catch (error) {
//       throw new ErrorResponse({
//         ...new BadRequestException(error.message),
//         errorCode: 'FIND_USER_BY_ID_ERROR',
//       });
//     }
//   }
// }
