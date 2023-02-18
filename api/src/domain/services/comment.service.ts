import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCommentDto } from 'src/application/dtos/comment';

import { ICommentService } from 'src/domain/interfaces/services/comment.service.interface';
import { Comment, CommentDocument } from 'src/domain/schemas/comment.schema';
import { TRACK_SERVICE_TOKEN } from 'src/shared/injection-tokens';
import { ITrackService } from '../interfaces/services/track.service.interface';

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
