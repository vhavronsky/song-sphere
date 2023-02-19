import { Model } from 'mongoose';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCommentDto } from '#dtos/comment';
import { TRACK_SERVICE_TOKEN } from '#shared/injection-tokens';

import { Comment, CommentDocument } from '#domain/schemas';

import { ICommentService } from '#interfaces/services/comment.service.interface';
import { ITrackService } from '#interfaces/services/track.service.interface';

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @Inject(TRACK_SERVICE_TOKEN)
    private readonly trackService: ITrackService,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.create(dto);

    await this.trackService.update(dto.trackId, {
      comments: [comment.id],
    });

    return comment;
  }
}
