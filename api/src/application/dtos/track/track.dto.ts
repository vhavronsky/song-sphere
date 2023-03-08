import { ObjectId } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

import { Track } from '#src/domain/schemas';
import { CommentDto } from '#dtos/comment';

export class TrackDto {
  @ApiProperty()
  readonly _id: ObjectId;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly lyrics: string;

  @ApiProperty()
  readonly streams: number;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly audio: string;

  @ApiProperty({ type: CommentDto, isArray: true })
  readonly comments: CommentDto[];

  static fromEntity(entity: Track): TrackDto {
    const it = new TrackDto();
    const { _id, name, author, lyrics, streams, image, audio, comments } =
      entity;

    return {
      ...it,
      _id,
      name,
      author,
      lyrics,
      streams,
      image,
      audio,
      comments,
    };
  }

  static toEntity(dto: TrackDto): Track {
    const it = new Track();
    const { _id, name, author, lyrics, streams, image, audio, comments } = dto;

    return {
      ...it,
      _id,
      name,
      author,
      lyrics,
      streams,
      image,
      audio,
      comments,
    };
  }
}
