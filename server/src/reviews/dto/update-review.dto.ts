import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsString()
  readonly reviewid: string;

  @IsString()
  readonly summary: string;

  @IsString()
  readonly score: string;

  @IsString()
  readonly isPublic: string;

  @IsString()
  readonly tag: string;
}
