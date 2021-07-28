import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly kakaoId: string;

  @IsString()
  readonly nickName: string;

  @IsString()
  readonly genre: string;

  @IsString()
  readonly gender: string = 'Secret';

  @IsString()
  readonly ageRange: string = 'Secret';

  @IsString()
  readonly profileImg: string =
    'https://rebookbucket.s3.ap-northeast-2.amazonaws.com/resize/w_200_defaultProfileImg.png';
}
