import { ObjectId } from 'mongoose';

import { TrackDto, CreateTrackDto, UpdateTrackDto } from '#dtos/track';
import { ITrack } from '#interfaces/schemas';

export interface ITrackRepository {
  findAll(limit?: number, skip?: number): Promise<ITrack[]>;

  search(query: string): Promise<ITrack[]>;

  findById(id: ObjectId, fieldsToPopulate: string | string[]): Promise<ITrack>;

  create(
    dto: CreateTrackDto & {
      audio: TrackDto['audio'];
      image: TrackDto['image'];
    },
  ): Promise<ITrack>;

  update(id: ObjectId, dto: UpdateTrackDto): Promise<ITrack>;

  incrementStreams(id: ObjectId): Promise<ITrack>;

  delete(id: ObjectId): Promise<ITrack>;
}
