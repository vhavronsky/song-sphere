import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { ITrack } from 'interfaces/schemas';

import { Comment } from './comment.schema';

export type TrackDocument = mongoose.HydratedDocument<Track>;

@Schema()
export class Track implements ITrack {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  lyrics: string;

  @Prop({ default: 0 })
  streams: number;

  @Prop()
  image: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
