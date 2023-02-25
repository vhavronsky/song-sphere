import { CreateCommentDto } from '#dtos/comment';
import { IComment } from '#interfaces/schemas';

export interface ICommentRepository {
  create: (dto: CreateCommentDto) => Promise<IComment>;
}
