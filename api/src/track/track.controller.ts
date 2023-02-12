import { Controller, Get } from '@nestjs/common';

import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

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
