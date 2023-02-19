import type { IComment } from './comment.schema.interface';

export interface ITrack {
  name: string;

  author: string;

  lyrics: string;

  streams: number;

  image: string;

  audio: string;

  comments: IComment[];
}
