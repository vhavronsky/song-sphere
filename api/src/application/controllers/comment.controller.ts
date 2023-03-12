import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_AUTH } from '#shared/constants';
import { COMMENT_SERVICE_TOKEN } from '#shared/injection-tokens';
import { JwtGuard } from '#application/guards/jwt.guard';
import { CommentDto, CreateCommentDto } from '#dtos/comment';
import { ICommentService } from '#interfaces/services/comment.service.interface';

@ApiBearerAuth(SWAGGER_AUTH)
@ApiTags('comments')
@Controller('comments')
@UseGuards(JwtGuard)
export class CommentController {
  constructor(
    @Inject(COMMENT_SERVICE_TOKEN)
    private readonly commentService: ICommentService,
  ) {}

  @Post()
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: HttpStatus.OK, type: CommentDto })
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateCommentDto): Promise<CommentDto> {
    return this.commentService.create(dto);
  }
}
