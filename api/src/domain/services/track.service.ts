import { ObjectId } from 'mongoose';

import { Inject, Injectable } from '@nestjs/common';

import { TrackDto, CreateTrackDto, UpdateTrackDto } from '#dtos/track';
import { FileType } from '#types/enums';
import { TRACK_REPOSITORY_TOKEN } from '#shared/injection-tokens';
import { FILE_SERVICE_TOKEN } from '#shared/injection-tokens';

import { ITrackRepository } from '#interfaces/repositories/track.repository.interface';
import { IFileService } from '#interfaces/services/file.service.interface';
import { ITrackService } from '#interfaces/services/track.service.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(
    @Inject(TRACK_REPOSITORY_TOKEN)
    private readonly trackRepository: ITrackRepository,
    @Inject(FILE_SERVICE_TOKEN)
    private readonly fileService: IFileService,
  ) {}

  async getAll(limit = 10, skip = 0): Promise<TrackDto[]> {
    const tracks = await this.trackRepository.findAll(limit, skip);

    return tracks.map(TrackDto.fromEntity);
  }

  async search(query: string): Promise<TrackDto[]> {
    const tracks = await this.trackRepository.search(query);

    return tracks.map(TrackDto.fromEntity);
  }

  async getOne(id: ObjectId): Promise<TrackDto> {
    const track = await this.trackRepository.findById(id, 'comments');

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

    const track = await this.trackRepository.create({
      ...dto,
      image: imagePath,
      audio: audioPath,
    });

    return TrackDto.fromEntity(track);
  }

  async update(id: ObjectId, dto: UpdateTrackDto): Promise<TrackDto> {
    const track = await this.trackRepository.update(id, dto);

    return TrackDto.fromEntity(track);
  }

  async addStream(id: ObjectId): Promise<number> {
    const updatedTrack = await this.trackRepository.incrementStreams(id);

    return updatedTrack.streams;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const deletedTrack = await this.trackRepository.delete(id);

    return deletedTrack?._id;
  }
}
