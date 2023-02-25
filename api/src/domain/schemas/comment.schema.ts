import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IComment } from '#interfaces/schemas/comment.schema.interface';
import { Track } from './track.schema';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema()
export class Comment implements IComment {
  _id: string;

  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
