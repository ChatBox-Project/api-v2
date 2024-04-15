import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Room, RoomChatDocument } from '../models/room.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomRepository extends BaseRepository<RoomChatDocument> {
  constructor(@InjectModel(Room.name) private readonly roomRepository: Model<RoomChatDocument>) {
    super(roomRepository);
  }
}
