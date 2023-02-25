import { Track } from '#src/domain/schemas';
import { CommentDto } from '#dtos/comment';

export class TrackDto {
  readonly _id: string;

  readonly name: string;

  readonly author: string;

  readonly lyrics: string;

  readonly streams: number;

  readonly image: string;

  readonly audio: string;

  readonly comments: CommentDto[];

  static fromEntity(entity: Track): TrackDto {
    const it = new CommentDto();
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
