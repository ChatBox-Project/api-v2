import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

interface SettingType {
  isFreeEnter?: boolean;
  isFreeKickMem?: boolean;
  isFreeEdit?: boolean;
}

@Schema({ timestamps: true })
export class Conversation {
  @Prop({
    type: [
      {
        user_id: { type: String, ref: 'User' },
        nick_name: String,
        joinedDate: Date,
        is_removed: { type: Boolean, default: false },
      },
    ],
  })
  members: { user_id: string; nick_name?: string; joinedDate?: Date; is_removed?: boolean }[];

  @Prop({ type: String, ref: 'GroupChat' })
  receiver: string;

  @Prop({ type: Boolean, default: false })
  is_group: boolean;

  @Prop({ type: String, ref: 'Message' })
  last_message: string;

  @Prop({ type: Boolean, required: true, default: false })
  seen_last_messages: boolean;

  @Prop({ type: Boolean })
  is_blocked: boolean;

  @Prop({ type: String, ref: 'User' })
  admin: string;

  @Prop({
    type: {
      sFreeEnter: { type: Boolean, default: false },
      isFreeKickMem: { type: Boolean, default: false },
      isFreeEdit: { type: Boolean, default: false },
    },
  })
  setting: {
    sFreeEnter?: boolean;
    isFreeKickMem?: boolean;
    isFreeEdit?: boolean;
  };

  @Prop({ type: Boolean, default: false })
  is_secret: boolean;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  requests: string[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
