import { ObjectId } from 'mongoose';

import type { ITrack } from './track.schema.interface';

export interface IComment {
  _id: ObjectId;

  username: string;

  text: string;

  track: ITrack;
}
