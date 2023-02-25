import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCommentDto } from '#dtos/comment';
import { ICommentRepository } from '#interfaces/repositories/comment.repository.interface';
import { Comment, CommentDocument } from '#schemas/comment.schema';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    return this.commentModel.create(dto);
  }
}
