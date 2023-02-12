import type { ITrack } from './track.schema.interface';

export interface IComment {
  username: string;

  text: string;

  track: ITrack;
}
