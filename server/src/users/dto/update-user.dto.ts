import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly info: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly profileImg: string;

  @IsString()
  readonly genre: string;
}
