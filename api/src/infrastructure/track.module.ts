import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackController } from '#controllers/track.controller';
import {
  TRACK_SERVICE_TOKEN,
  TRACK_REPOSITORY_TOKEN,
} from '#shared/injection-tokens';
import { Track, TrackSchema } from '#domain/schemas';
import { TrackRepository } from '#repositories/track.repository';
import { TrackService } from '#services/track.service';

import { FileModule } from './file.module';

const providers: Provider[] = [
  { provide: TRACK_SERVICE_TOKEN, useClass: TrackService },
  { provide: TRACK_REPOSITORY_TOKEN, useClass: TrackRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    FileModule,
  ],
  controllers: [TrackController],
  providers,
  exports: providers,
})
export class TrackModule {}
