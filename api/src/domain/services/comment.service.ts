import { Inject, Injectable } from '@nestjs/common';

import {
  COMMENT_REPOSITORY_TOKEN,
  TRACK_SERVICE_TOKEN,
} from '#shared/injection-tokens';
import { CommentDto, CreateCommentDto } from '#dtos/comment';

import { ICommentRepository } from '#interfaces/repositories';
import { ICommentService, ITrackService } from '#interfaces/services';

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY_TOKEN)
    private readonly commentRepository: ICommentRepository,
    @Inject(TRACK_SERVICE_TOKEN)
    private readonly trackService: ITrackService,
  ) {}

  async create(dto: CreateCommentDto): Promise<CommentDto> {
    const comment = await this.commentRepository.create(dto);

    await this.trackService.update(dto.trackId, {
      comments: [comment._id],
    });

    return CommentDto.fromEntity(comment);
  }
}
