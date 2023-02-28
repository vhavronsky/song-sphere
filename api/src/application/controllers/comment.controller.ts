import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CommentDto, CreateCommentDto } from '#dtos/comment';
import { COMMENT_SERVICE_TOKEN } from '#shared/injection-tokens';
import { ICommentService } from '#interfaces/services/comment.service.interface';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    @Inject(COMMENT_SERVICE_TOKEN)
    private readonly commentService: ICommentService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCommentDto })
  create(@Body() dto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(dto);
  }
}
