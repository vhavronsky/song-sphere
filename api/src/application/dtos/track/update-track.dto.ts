import { ObjectId } from 'mongoose';

export class UpdateTrackDto {
  readonly name?: string;

  readonly author?: string;

  readonly lyrics?: string;

  readonly streams?: number;

  readonly image?: string;

  readonly audio?: string;

  readonly comments?: ObjectId | ObjectId[];
}