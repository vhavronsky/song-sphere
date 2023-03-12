import { ObjectId } from 'mongoose';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { SWAGGER_AUTH } from '#src/shared/constants';
import { TRACK_SERVICE_TOKEN } from '#shared/injection-tokens';
import { JwtGuard } from '#application/guards/jwt.guard';
import { OptionalPipe } from '#pipes/optional.pipe';
import { TrackDto, CreateTrackDto, UpdateTrackDto } from '#dtos/track';
import { ITrackService } from '#interfaces/services/track.service.interface';

@ApiBearerAuth(SWAGGER_AUTH)
@ApiTags('tracks')
@Controller('tracks')
@UseGuards(JwtGuard)
export class TrackController {
  constructor(
    @Inject(TRACK_SERVICE_TOKEN)
    private readonly trackService: ITrackService,
  ) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: [TrackDto] })
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit', new OptionalPipe(new ParseIntPipe())) limit: number,
    @Query('skip', new OptionalPipe(new ParseIntPipe())) skip: number,
  ): Promise<TrackDto[]> {
    return this.trackService.getAll(limit, skip);
  }

  @Get('search')
  @ApiQuery({ name: 'query' })
  @ApiResponse({ status: HttpStatus.OK, type: [TrackDto] })
  @HttpCode(HttpStatus.OK)
  search(@Query('query') query: string): Promise<TrackDto[]> {
    return this.trackService.search(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: TrackDto })
  @HttpCode(HttpStatus.OK)
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
  @ApiResponse({ status: HttpStatus.CREATED, type: TrackDto })
  @HttpCode(HttpStatus.CREATED)
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
  @ApiResponse({ status: HttpStatus.OK, type: TrackDto })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: ObjectId,
    @Body() dto: UpdateTrackDto,
  ): Promise<TrackDto> {
    return this.trackService.update(id, dto);
  }

  @Patch(':id/stream')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  @HttpCode(HttpStatus.OK)
  addStream(@Param('id') id: ObjectId): Promise<number> {
    return this.trackService.addStream(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: ObjectId): Promise<ObjectId> {
    return this.trackService.delete(id);
  }
}
