import { ObjectId } from 'mongoose';

import type { IComment } from './comment.schema.interface';

export interface ITrack {
  _id: ObjectId;

  name: string;

  author: string;

  lyrics: string;

  streams: number;

  image: string;

  audio: string;

  comments: IComment[];
}
