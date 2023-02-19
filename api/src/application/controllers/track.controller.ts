import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

import { CreateTrackDto, UpdateTrackDto } from 'src/application/dtos/track';
import { OptionalPipe } from 'src/application/pipes/optional.pipe';

import { ITrackService } from 'src/domain/interfaces/services/track.service.interface';

import { TRACK_SERVICE_TOKEN } from 'src/shared/injection-tokens';

@Controller('tracks')
export class TrackController {
  constructor(
    @Inject(TRACK_SERVICE_TOKEN)
    private readonly trackService: ITrackService,
  ) {}

  @Get()
  getAll(
    @Query('limit', new OptionalPipe(new ParseIntPipe())) limit: number,
    @Query('skip', new OptionalPipe(new ParseIntPipe())) skip: number,
  ) {
    return this.trackService.getAll(limit, skip);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @Body() dto: CreateTrackDto,
    @UploadedFiles()
    files: { image: Express.Multer.File[]; audio: Express.Multer.File[] },
  ) {
    const { image, audio } = files;

    return this.trackService.create(dto, image[0], audio[0]);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UpdateTrackDto) {
    return this.trackService.update(id, dto);
  }

  @Patch(':id/stream')
  addStream(@Param('id') id: ObjectId): Promise<number> {
    return this.trackService.addStream(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }
}
