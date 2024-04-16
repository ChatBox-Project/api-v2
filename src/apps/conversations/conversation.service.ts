import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model, Types } from 'mongoose';
import { ConversationRepository } from 'src/common';
import { AccountEntity } from 'src/common/entities';
import { Conversation, ConversationDocument } from 'src/common/models/conversation.model';
import { Messages, MessagesDocument } from 'src/common/models/message.model';
import { Room, RoomChatDocument } from 'src/common/models/room.model';
import { User, UserDocument } from 'src/common/models/user.model';
import { ErrorResponse } from 'src/errors';
import { AccountRepository } from '../accounts/account.repository';
import { ResponseService } from 'src/common/res';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Room.name) private readonly roomModel: Model<RoomChatDocument>,
    @InjectModel(Messages.name) private readonly messageModel: Model<MessagesDocument>,
    @InjectRepository(AccountEntity) private readonly accountRepository: AccountRepository,
    private readonly conversationRepository: ConversationRepository,
    private readonly _res: ResponseService,
  ) {}
  private async getUsers(userIds: string[]) {
    // console.log(userIds);
    const users = await this.userModel.find({ _id: { $in: userIds } });
    // console.log(users);
    return users;
  }

  private generateRoomName(members: any[]) {
    let groupName = members[0].nick_name.split(' ').slice(-1).join('');
    if ((members.length = 1)) {
      return groupName;
    }
    const maxCount = 2;
    const length = members.length > maxCount ? maxCount : members.length;
    for (let i = 1; i < length; i++) {
      groupName = groupName + ', ' + members[i].nick_name.split(' ').slice(-1).join(' ');
    }
    return groupName + ',...';
  }

  public async createConversation(userIds: string[]): Promise<ConversationDocument> {
    // console.log(userIds)
    const users = await this.getUsers([...userIds]);
    // console.log(users);
    const members = users.map((user) => ({ user_id: user._id, nick_name: user.name }));
    // console.log(members);
    const conversation = await this.conversationModel.create({ members, is_group: false });
    return conversation;
  }

  public async createGroup(adminId: string, userId: string[], groupName: string) {
    try {
      //

      const users = await this.getUsers([adminId, ...userId]);
      // console.log('user::', users);
      const members = [];

      users.forEach((user) => {
        if (
          members.length === 0 ||
          members.filter(function (e) {
            return e.userId === user._id;
          }).length === 0
        ) {
          members.push({ userId: user._id, nick_name: user.name });
        }
      });
      // console.log('member::', members);
      let groupChat = null;

      if (members.length > 1) {
        const nameGroupChat = this.generateRoomName(members);
        groupChat = await this.roomModel.create({
          nick_name: groupName || nameGroupChat,
          avatar: '',
        });
      } else {
        throw new Error('Group chat must have at least 2 members');
      }
      // console.log('groupChat::', groupChat);

      // console.log(members[0].userId)
      const message = await this.messageModel.create({
        authorId: members[0].userId,
        content: `Welcome to ${groupChat.nick_name}`,
        content_type: 'notification',
      });

      // console.log('message::', message);
      const conversation = await this.conversationModel.create({
        members,
        is_group: true,
        receiver: groupChat || undefined,
        last_message: message._id,
        admin: adminId,
        settings: {
          isFreeEnter: false,
          isFreeKickMem: false,
          isFreeEdit: false,
        },
      });
      // console.log('conversation::', conversation);
      message.conversation = conversation._id;
      message.save();

      return this._res.createResponse(200, 'success', conversation);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Create group chat failed'),
        errorCode: 'CREATE_GROUP_CHAT_FAILED',
      });
    }
  }
  public async getReqList(conversationId: string) {
    try {
      // console.log('conversationId', conversationId)
      const reqList = await this.conversationModel.findById(conversationId).lean();
      // console.log('reqList', reqList)
      return this._res.createResponse(200, 'success', reqList);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Get request list failed'),
        errorCode: 'GET_REQUEST_LIST_FAILED',
      });
    }
  }
}
