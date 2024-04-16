import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User extends Document {
  // @Prop({ auto: true, required: false })
  // _id: string;

  @Prop({ default: '', type: String })
  name: string;

  @Prop({ enum: ['FEMALE', 'MALE', 'OTHER'], default: 'OTHER' })
  gender: string;

  @Prop({ default: '', type: String })
  avatarUrl: string;

  @Prop({ default: '', type: String })
  birth_day: string;

  @Prop({ default: '', type: String })
  accountId: string;

  @Prop([
    {
      user_id: { type: Types.ObjectId, ref: 'User' },
      status: String,
      _id: false,
    },
  ])
  friends: Array<{ user_id: string; status: string }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
