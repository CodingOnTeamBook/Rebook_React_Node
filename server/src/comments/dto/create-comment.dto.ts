import { IsString } from 'class-validator';

//보완필요
export class CreateCommentDto {
  @IsString()
  readonly text: string;

  @IsString()
  readonly nickname: string;
}
