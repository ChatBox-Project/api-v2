import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type RoomChatDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
  @Prop({ type: String })
  nick_name: string;

  @Prop({ type: String })
  avatar: string;
}

export const RoomChatSchema = SchemaFactory.createForClass(Room);
