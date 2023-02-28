import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly text: string;

  @ApiProperty({ type: String })
  readonly trackId: ObjectId;
}
