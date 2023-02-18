import { ObjectId } from 'mongoose';

import { CreateTrackDto, UpdateTrackDto } from 'src/application/dtos/track';

import { ITrack } from 'src/domain/interfaces/schemas/track.schema.interface';

export interface ITrackService {
  getAll: () => Promise<ITrack[]>;

  getOne: (id: ObjectId) => Promise<ITrack>;

  create: (dto: CreateTrackDto) => Promise<ITrack>;

  update: (id: ObjectId, dto: UpdateTrackDto) => Promise<ITrack>;

  delete: (id: ObjectId) => Promise<ObjectId>;
}
