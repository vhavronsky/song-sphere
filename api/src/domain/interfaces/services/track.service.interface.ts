import { ObjectId } from 'mongoose';

import { TrackDto, CreateTrackDto, UpdateTrackDto } from '#dtos/track';

export interface ITrackService {
  getAll: (limit: number, skip: number) => Promise<TrackDto[]>;

  search: (query: string) => Promise<TrackDto[]>;

  getOne: (id: ObjectId) => Promise<TrackDto>;

  create: (
    dto: CreateTrackDto,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ) => Promise<TrackDto>;

  update: (id: ObjectId, dto: UpdateTrackDto) => Promise<TrackDto>;

  addStream: (id: ObjectId) => Promise<number>;

  delete: (id: ObjectId) => Promise<ObjectId>;
}
