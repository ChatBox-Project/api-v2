import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ auto: true })
  _id: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ enum: ['FEMALE', 'MALE', 'OTHER'], default: 'OTHER' })
  gender: string;

  @Prop()
  avatar: string;

  @Prop({ default: Date.now })
  birth_day: Date;

  @Prop({ default: '' })
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
