import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTrackDto, TrackDto, UpdateTrackDto } from '#dtos/track';

import { Track, TrackDocument } from '#domain/schemas';
import { ITrackRepository } from '#interfaces/repositories/track.repository.interface';

@Injectable()
export class TrackRepository implements ITrackRepository {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<TrackDocument>,
  ) {}

  async findAll(limit = 10, skip = 0): Promise<Track[]> {
    return this.trackModel.find().skip(skip).limit(limit).lean();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel
      .find({
        name: { $regex: new RegExp(query, 'i') },
      })
      .lean();
  }

  async findById(
    id: ObjectId,
    fieldsToPopulate: string | string[],
  ): Promise<Track> {
    return this.trackModel.findById(id).populate(fieldsToPopulate).lean();
  }

  async create(
    dto: CreateTrackDto & {
      audio: TrackDto['audio'];
      image: TrackDto['image'];
    },
  ): Promise<Track> {
    return this.trackModel.create(dto);
  }

  async update(id: ObjectId, dto: UpdateTrackDto): Promise<Track> {
    const { comments, ...fields } = dto;

    const updateQuery = {
      ...fields,
      ...this.updateCommentsQuery(comments),
    };
    const updateOptions = { new: true };

    return this.trackModel
      .findByIdAndUpdate(id, updateQuery, updateOptions)
      .lean();
  }

  async incrementStreams(id: ObjectId): Promise<Track> {
    const updateQuery = { $inc: { streams: 1 } };
    const updateOptions = { new: true };

    const updatedTrack = await this.trackModel
      .findByIdAndUpdate(id, updateQuery, updateOptions)
      .lean();

    return updatedTrack;
  }

  async delete(id: ObjectId): Promise<Track> {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id).lean();

    return deletedTrack;
  }

  private updateCommentsQuery(comments: any) {
    if (!comments) return {};
    if (Array.isArray(comments))
      return {
        $push: {
          comments: comments[0],
        },
      };
    return {
      comments: [comments],
    };
  }
}
