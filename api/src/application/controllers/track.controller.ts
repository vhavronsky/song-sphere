import { ObjectId } from 'mongoose';

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
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import { OptionalPipe } from '#pipes/optional.pipe';
import { TrackDto, CreateTrackDto, UpdateTrackDto } from '#dtos/track';
import { TRACK_SERVICE_TOKEN } from '#shared/injection-tokens';
import { ITrackService } from '#interfaces/services/track.service.interface';

@ApiTags('tracks')
@Controller('tracks')
export class TrackController {
  constructor(
    @Inject(TRACK_SERVICE_TOKEN)
    private readonly trackService: ITrackService,
  ) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getAll(
    @Query('limit', new OptionalPipe(new ParseIntPipe())) limit: number,
    @Query('skip', new OptionalPipe(new ParseIntPipe())) skip: number,
  ): Promise<TrackDto[]> {
    return this.trackService.getAll(limit, skip);
  }

  @Get('search')
  search(@Query('query') query: string): Promise<TrackDto[]> {
    return this.trackService.search(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getOne(@Param('id') id: ObjectId): Promise<TrackDto> {
    return this.trackService.getOne(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTrackDto })
  create(
    @Body() dto: CreateTrackDto,
    @UploadedFiles()
    files: { image: Express.Multer.File[]; audio: Express.Multer.File[] },
  ): Promise<TrackDto> {
    const { image, audio } = files;

    return this.trackService.create(dto, image?.[0], audio?.[0]);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  update(
    @Param('id') id: ObjectId,
    @Body() dto: UpdateTrackDto,
  ): Promise<TrackDto> {
    return this.trackService.update(id, dto);
  }

  @Patch(':id/stream')
  @ApiParam({ name: 'id' })
  addStream(@Param('id') id: ObjectId): Promise<number> {
    return this.trackService.addStream(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: ObjectId): Promise<ObjectId> {
    return this.trackService.delete(id);
  }
}
