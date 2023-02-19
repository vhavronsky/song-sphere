import { Body, Controller, Inject, Post } from '@nestjs/common';

import { COMMENT_SERVICE_TOKEN } from 'shared/injection-tokens';
import { CreateCommentDto } from 'dtos/comment/create-comment.dto';

import { ICommentService } from 'interfaces/services/comment.service.interface';

@Controller('comments')
export class CommentController {
  constructor(
    @Inject(COMMENT_SERVICE_TOKEN)
    private readonly commentService: ICommentService,
  ) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }
}
