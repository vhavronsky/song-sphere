import { ObjectId } from 'mongoose';

import { TrackDto } from '#dtos/track';
import { Comment } from '#domain/schemas';

export class CommentDto {
  readonly _id: ObjectId;

  readonly username: string;

  readonly text: string;

  readonly track: TrackDto;

  static fromEntity(entity: Comment): CommentDto {
    const it = new CommentDto();
    const { _id, username, text, track } = entity;

    return {
      ...it,
      _id,
      username,
      text,
      track,
    };
  }

  static toEntity(dto: CommentDto): Comment {
    const it = new Comment();
    const { _id, username, text, track } = dto;

    return {
      ...it,
      _id,
      username,
      text,
      track,
    };
  }
}
