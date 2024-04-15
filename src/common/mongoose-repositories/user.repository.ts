import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Room, RoomChatDocument } from '../models/room.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) private readonly userRepository: Model<UserDocument>) {
    super(userRepository);
  }
}
