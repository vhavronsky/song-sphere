import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  readonly access_token: string;

  static format(token: string): TokenDto {
    return {
      access_token: token,
    };
  }
}
