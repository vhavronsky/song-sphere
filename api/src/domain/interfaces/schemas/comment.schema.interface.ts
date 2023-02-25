import type { ITrack } from './track.schema.interface';

export interface IComment {
  _id: string;

  username: string;

  text: string;

  track: ITrack;
}
