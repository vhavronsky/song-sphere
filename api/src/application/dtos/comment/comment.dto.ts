import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { TrackDto } from '#dtos/track';
import { Comment } from '#domain/schemas';

export class CommentDto {
  @ApiProperty()
  readonly _id: ObjectId;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly text: string;

  @ApiProperty({ type: TrackDto })
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
