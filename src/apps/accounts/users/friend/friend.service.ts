import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities';
import { UserRepository } from '../user.repository';

@Injectable()
export class FriendService {
  constructor(@InjectRepository(UserEntity) private readonly _userRepository: UserRepository) {}
}
