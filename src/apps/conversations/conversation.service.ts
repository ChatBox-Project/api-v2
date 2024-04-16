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
    const users = await this.userModel.find({ _id: { $in: userIds } });
    return users;
  }

  private getUserByAccountId(accountId: string) {
    return this.userModel.findOne({ accountId: accountId });
  }
  private async findAccountByToken(token: string) {
    const account = await this.accountRepository.findOne({ where: { accessToken: token } });
    return account;
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
  private async findConversationByUserId(userId: string): Promise<ConversationDocument[]> {
    return this.conversationModel
      .find({
        members: { $elemMatch: { user_id: userId } },
      })
      .exec();
  }

  public async createConversation(userIds: string[]): Promise<unknown> {
    try {
      const users = await this.getUsers([...userIds]);
      // console.log('users:::', users);
      const members = [];
      users.forEach((user) => {
        members.push({
          user_id: user._id,
          nick_name: user.name,
          is_removed: false,
        });
      });
      // console.log('members:::', members);

      const conversation = await this.conversationModel.create({
        members: members,
        is_group: false,
      });
      // console.log('conversation:::', conversation);
      const metadata = { conversation };
      return this._res.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Create conversation failed'),
        errorCode: 'CREATE_CONVERSATION_FAILED',
      });
    }
  }

  public async createGroup(adminId: string, userId: string[], groupName: string) {
    try {
      // console.log("groupname::", groupName)
      const users = await this.getUsers([adminId, ...userId]);
      // console.log('user::', users);

      const members = users.map((user) => ({
        userId: user._id,
        nick_name: user.name,
        is_removed: false,
      }));
      // console.log('member::', members);

      const nameGroupChat = this.generateRoomName(members);
      // console.log('nameGroupChat::', nameGroupChat);

      // genenate room
      const groupChat = await this.roomModel.create({
        nick_name: groupName || nameGroupChat,
        avatar: '',
      });
      // console.log('groupChat::', groupChat);

      const createMessage = await this.messageModel.create({
        authorId: adminId,
        content: `Welcome to ${groupChat.nick_name}`,
        content_type: 'notification',
      });
      // console.log('createMessage::', createMessage);

      const createConversation = await this.conversationModel.create({
        members: users.map((user) => ({
          userId: user._id,
          nick_name: user.name,
        })),
        receiver: groupChat._id,
        is_group: true,
        last_message: createMessage._id,
        seen_last_messages: false,
        is_blocked: false,
        admin: adminId,
        setting: {
          isFreeEnter: false,
          isFreeKickMem: false,
          isFreeEdit: false,
        },
        is_secret: false,
        requests: [],
      });
      console.log('createConversation::', createConversation);
      // // console.log('conversation::', conversation);
      createMessage.conversation = createConversation._id;
      await createMessage.save();
      // console.log('saveMessage::', saveMessage);

      const metadata = { createConversation };
      return this._res.createResponse(200, 'success', metadata);
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
      const metadata = { reqList };
      return this._res.createResponse(200, 'success', metadata);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Get request list failed'),
        errorCode: 'GET_REQUEST_LIST_FAILED',
      });
    }
  }

  public async getAllByUser(token: string) {
    try {
      const holderAccount = await this.findAccountByToken(token);
      // console.log('holderAccount', holderAccount);
      const holderUser = await this.getUserByAccountId(holderAccount.id);
      console.log('holderUser', holderUser);

      const conversations = await this.findConversationByUserId(holderUser._id);
      console.log('conversations', conversations);
    } catch (error) {
      throw new ErrorResponse({
        ...new BadRequestException('Get all by user failed'),
        errorCode: 'GET_ALL_BY_USER_FAILED',
      });
    }
  }
}
