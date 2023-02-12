import { Injectable } from '@nestjs/common';

import { ITrackService } from 'src/domain/interfaces/services/track.service.interface';

@Injectable()
export class TrackService implements ITrackService {
  async getAll() {
    return 'getAll';
  }

  async getOne() {
    return 'getOne';
  }

  async create() {
    return 'create';
  }

  async delete() {
    return 'delete';
  }
}
