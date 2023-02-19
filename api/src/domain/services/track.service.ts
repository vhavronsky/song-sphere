import { Model, ObjectId } from 'mongoose';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTrackDto, UpdateTrackDto } from '#dtos/track';
import { FileType } from '#types/enums';
import { FILE_SERVICE_TOKEN } from '#shared/injection-tokens';

import { Track, TrackDocument } from '#domain/schemas';

import { IFileService } from '#interfaces/services/file.service.interface';
import { ITrackService } from '#interfaces/services/track.service.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(
    @InjectModel(Track.name)
    private readonly trackModel: Model<TrackDocument>,
    @Inject(FILE_SERVICE_TOKEN)
    private readonly fileService: IFileService,
  ) {}

  async getAll(limit = 10, skip = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(skip).limit(limit);

    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');

    return track.save();
  }

  async create(
    dto: CreateTrackDto,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const imagePath = await this.fileService.createFile(FileType.IMAGE, image);
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);

    const track = await this.trackModel.create({
      ...dto,
      image: imagePath,
      audio: audioPath,
    });

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

  async addStream(id: ObjectId): Promise<number> {
    const updatedTrack = await this.trackModel.findByIdAndUpdate(
      id,
      { $inc: { streams: 1 } },
      {
        new: true,
      },
    );

    return updatedTrack.streams;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);

    return track?.id;
  }
}
