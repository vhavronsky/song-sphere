import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly lyrics: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'image file',
  })
  readonly image: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'audio file',
  })
  readonly audio: string;
}
