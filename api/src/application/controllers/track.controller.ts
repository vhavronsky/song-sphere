import { Controller, Get, Inject } from '@nestjs/common';

import { TRACK_SERVICE_TOKEN } from 'src/shared/injection-tokens';
import { ITrackService } from 'src/domain/interfaces/services/track.service.interface';

@Controller('tracks')
export class TrackController {
  constructor(
    @Inject(TRACK_SERVICE_TOKEN)
    private readonly trackService: ITrackService,
  ) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne() {
    return this.trackService.getOne();
  }

  @Get()
  create() {
    return this.trackService.create();
  }

  @Get()
  delete() {
    return this.trackService.delete();
  }
}
