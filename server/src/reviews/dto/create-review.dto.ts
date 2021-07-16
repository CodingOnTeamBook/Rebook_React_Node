import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly writer: string;

  @IsString()
  readonly bookInfo: string;

  @IsString()
  readonly summary: string;

  @IsString()
  readonly score: string;

  @IsString()
  readonly isPublic: string = '1';

  @IsString()
  readonly tag: string;
}
