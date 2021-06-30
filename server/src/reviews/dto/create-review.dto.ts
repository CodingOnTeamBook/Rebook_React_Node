import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly text: string;

  @IsString()
  readonly bookId: string;

  @IsString()
  readonly score: string;

  @IsString()
  readonly public: boolean = true;

  @IsString()
  readonly tag: string;
}