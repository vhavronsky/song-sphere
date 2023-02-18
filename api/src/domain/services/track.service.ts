import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateTrackDto, UpdateTrackDto } from 'src/application/dtos/track';

import { ITrackService } from 'src/domain/interfaces/services/track.service.interface';
import { Track, TrackDocument } from 'src/domain/schemas/track.schema';

@Injectable()
export class TrackService implements ITrackService {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<TrackDocument>,
  ) {}

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();

    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');

    return track.save();
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create(dto);

    return track;
  }

  async update(id: ObjectId, dto: UpdateTrackDto): Promise<Track> {
    const { comments, ...fields } = dto;

    const track = await this.trackModel.findByIdAndUpdate(
      id,
      {
        ...fields,
        ...(comments
          ? Array.isArray(comments)
            ? {
                $push: {
                  comments: comments?.[0],
                },
              }
            : { comments: [comments] }
          : {}),
      },
      {
        new: true,
      },
    );

    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);

    return track?.id;
  }
}
