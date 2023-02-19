import { ObjectId } from 'mongoose';

import { CreateTrackDto, UpdateTrackDto } from '#dtos/track';
import { ITrack } from '#interfaces/schemas';

export interface ITrackService {
  getAll: (limit: number, skip: number) => Promise<ITrack[]>;

  search: (query: string) => Promise<ITrack[]>;

  getOne: (id: ObjectId) => Promise<ITrack>;

  create: (
    dto: CreateTrackDto,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ) => Promise<ITrack>;

  update: (id: ObjectId, dto: UpdateTrackDto) => Promise<ITrack>;

  addStream: (id: ObjectId) => Promise<number>;

  delete: (id: ObjectId) => Promise<ObjectId>;
}
