import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type MessagesDocument = Messages & Document;
@Schema({ timestamps: true })
export class Messages extends Document {

  @Prop({ required: true, type: String })
  authorId: string;

  @Prop({ required: true, type: String })
  content_type?: string;

  @Prop({ default: '', required: true, type: String })
  content?: string;

  @Prop({ type: Boolean, default: false })
  delete?: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Conversation' })
  conversation?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
