import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class OptionalPipe implements PipeTransform {
  constructor(private pipe: PipeTransform) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      return value;
    }
    return this.pipe.transform(value, metadata);
  }
}
