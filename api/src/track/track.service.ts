import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
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
