import { CommentDto, CreateCommentDto } from '#dtos/comment';

export interface ICommentService {
  create: (dto: CreateCommentDto) => Promise<CommentDto>;
}
