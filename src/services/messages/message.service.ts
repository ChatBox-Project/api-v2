import { BadRequestException, Body, Headers, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.base.entity';
import { ErrorResponse } from 'src/errors';
import { AccountRepository, MessageRepository, UserRepository } from 'src/repositories';
import { CreateMessageDto } from 'src/validators';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly _messageRepository: MessageRepository,
    @InjectRepository(AccountEntity) private readonly _accountRepository: AccountRepository,
    @InjectRepository(UserEntity) private readonly _userRepository: UserRepository,
  ) {}

  public async createMessage(token: string, message: CreateMessageDto) {
    try {
      // find token
      const holderAccount = await this.findAccountByToken(token);
      console.log('holderAccount:: ', holderAccount);
      // find user
      const holderUser = await this.findUserByAccountId(holderAccount.userId);
      console.log('holderUser:: ', holderUser);


    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException(error.message),
        errorCode: 'USER_NOT_FOUND',
      });
    }
  }
  public async saveMessage(message: MessageEntity) {}
  public async getMessages(): Promise<MessageEntity[]> {
    return await this._messageRepository.find();
  }

  private async findMessageById(id: string): Promise<MessageEntity> {
    //check if the message
    const message = await this._messageRepository.findOne({ where: { messageId: id } });
    if (!message) {
      throw new ErrorResponse({
        ...new BadRequestException('Message not found'),
        errorCode: 'MESSAGE_NOT_FOUND',
      });
    }
    return message;
  }
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

  private async findUserByAccountId(accountId: string): Promise<UserEntity> {
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
