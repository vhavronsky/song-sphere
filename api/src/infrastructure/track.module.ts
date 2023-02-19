import { MongooseModule } from '@nestjs/mongoose';
import { Module, Provider } from '@nestjs/common';

import { FileModule } from './file.module';

import { TrackController } from '../application/controllers/track.controller';
import { TrackService } from '../domain/services/track.service';
import { Track, TrackSchema } from '../domain/schemas/track.schema';
import { TRACK_SERVICE_TOKEN } from 'src/shared/injection-tokens';

const providers: Provider[] = [
  { provide: TRACK_SERVICE_TOKEN, useClass: TrackService },
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