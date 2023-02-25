import { Model, ObjectId } from 'mongoose';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TrackDto, CreateTrackDto, UpdateTrackDto } from '#dtos/track';
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

  async getAll(limit = 10, skip = 0): Promise<TrackDto[]> {
    const tracks = await this.trackModel.find().skip(skip).limit(limit);

    return tracks.map(TrackDto.fromEntity);
  }

  async search(query: string): Promise<TrackDto[]> {
    const tracks = await this.trackModel
      .find({
        name: { $regex: new RegExp(query, 'i') },
      })
      .lean();

    return tracks.map(TrackDto.fromEntity);
  }

  async getOne(id: ObjectId): Promise<TrackDto> {
    const track = await this.trackModel
      .findById(id)
      .populate('comments')
      .lean();

    return TrackDto.fromEntity(track);
  }

  async create(
    dto: CreateTrackDto,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<TrackDto> {
    // Create the image and audio files, and get their respective paths
    const imagePath = await this.fileService.createFile(FileType.IMAGE, image);
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);

    const track = await this.trackModel.create({
      ...dto,
      image: imagePath,
      audio: audioPath,
    });

    return TrackDto.fromEntity(track);
  }

  async update(id: ObjectId, dto: UpdateTrackDto): Promise<TrackDto> {
    const { comments, ...fields } = dto;

    const updateQuery = {
      ...fields,
      ...this.updateCommentsQuery(comments),
    };
    const updateOptions = { new: true };

    const track = await this.trackModel
      .findByIdAndUpdate(id, updateQuery, updateOptions)
      .lean();

    return TrackDto.fromEntity(track);
  }

  async addStream(id: ObjectId): Promise<number> {
    const updatedTrack = await this.trackModel
      .findByIdAndUpdate(
        id,
        { $inc: { streams: 1 } },
        {
          new: true,
        },
      )
      .lean();

    return updatedTrack.streams;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id).lean();

    return track?.id;
  }

  private updateCommentsQuery(comments: any) {
    if (!comments) return {}; // don't update comments if it's not provided in the DTO

    if (Array.isArray(comments))
      return {
        $push: {
          comments: comments[0], // add new comments to the existing array of comments
        },
      };

    return {
      comments: [comments], // create a new array of comments
    };
  }
}
