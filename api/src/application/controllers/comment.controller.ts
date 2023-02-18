import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateCommentDto } from 'src/application/dtos/comment/create-comment.dto';

import { ICommentService } from 'src/domain/interfaces/services/comment.service.interface';

import { COMMENT_SERVICE_TOKEN } from 'src/shared/injection-tokens';

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
