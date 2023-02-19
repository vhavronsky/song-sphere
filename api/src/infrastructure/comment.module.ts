import { TrackModule } from './track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, Provider } from '@nestjs/common';

import { COMMENT_SERVICE_TOKEN } from 'shared/injection-tokens';

import { CommentController } from 'controllers/comment.controller';
import { CommentService } from 'services/comment.service';
import { Comment, Track, CommentSchema, TrackSchema } from 'domain/schemas';

const providers: Provider[] = [
  { provide: COMMENT_SERVICE_TOKEN, useClass: CommentService },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    TrackModule,
  ],
  controllers: [CommentController],
  providers,
})
export class CommentModule {}
