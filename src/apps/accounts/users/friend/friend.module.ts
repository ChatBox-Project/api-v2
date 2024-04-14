import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';

@Module({
  providers: [FriendService],
  controllers: [],
  imports: [],
  exports: [FriendService],
})
export class FriendModule {}
