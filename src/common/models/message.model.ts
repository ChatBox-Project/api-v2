import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export interface MessagesDocument extends Document {
  _id: string;
  authorId: string;
  content: string;
  delete: boolean;
  conversation: string;
  createdAt: Date;
  updatedAt: Date;
}
@Schema({ timestamps: true })
export class Messages extends Document {
  @Prop({ auto: true })
  _id: string;

  @Prop({ required: true, type: String })
  authorId: string;

  @Prop({ default: '', required: true, type: String })
  content: string;

  @Prop({ type: Boolean, default: false })
  delete: boolean;
  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
