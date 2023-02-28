import { ObjectId } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly author?: string;

  @ApiPropertyOptional()
  readonly lyrics?: string;

  @ApiPropertyOptional()
  readonly streams?: number;

  @ApiPropertyOptional()
  readonly image?: string;

  @ApiPropertyOptional()
  readonly audio?: string;

  @ApiPropertyOptional({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  readonly comments?: ObjectId | ObjectId[];
}
