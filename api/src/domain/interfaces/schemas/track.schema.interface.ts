import type { IComment } from './comment.schema.interface';

export interface ITrack {
  _id: string;

  name: string;

  author: string;

  lyrics: string;

  streams: number;

  image: string;

  audio: string;

  comments: IComment[];
}
