import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsString()
  readonly reviewid: string;

  @IsString()
  @IsOptional()
  readonly summary: string;

  @IsString()
  @IsOptional()
  readonly score: string;

  @IsString()
  @IsOptional()
  readonly isPublic: string;

  @IsString()
  @IsOptional()
  readonly tag: string;
}
