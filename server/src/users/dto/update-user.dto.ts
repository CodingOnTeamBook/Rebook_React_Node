import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly info: string = '자기 소개를 작성해주세요.';

  @IsString()
  readonly imgUrl: string = 'defaultImg';
}
