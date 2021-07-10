import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { AuthUser } from './users.decorator';
import { Comment } from '../entities/comment.entity';

//에러 처리 middleware 생성하기

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    this.usersService.signup(createUserDto).then((value: User) => {
      return res.status(HttpStatus.OK).json({
        success: true,
        user: value,
      });
    });
  }

  @Post('/login')
  login(@Body('kakaoId') kakaoId: string, @Res() res) {
    this.usersService.Login(kakaoId).then((value: boolean) => {
      if (value) {
        this.usersService.generateToken(kakaoId).then((value: string) => {
          res.cookie('user_Access', value, { httpOnly: true });
          return res.status(HttpStatus.OK).json({
            success: true,
            type: 1,
            userId: kakaoId,
            accessToken: value,
          });
        });
      } else {
        return res.status(HttpStatus.OK).json({
          success: true,
          type: 0,
        });
      }
    });
  }

  @Get('/check/:nickname')
  getNick(@Param('nickname') nickname: string, @Res() res) {
    this.usersService.checkNick(nickname).then((value: boolean) => {
      const AllowNickname = !value;
      return res.status(HttpStatus.OK).json({
        success: true,
        results: AllowNickname,
      });
    });
  }

  //내 정보 조회
  @Get('/myinfo/:nickname')
  findOne(@Param('nickname') nickname: string, @Res() res) {
    this.usersService.findByNickname(nickname).then((value: User) => {
      if (value) {
        return res.status(HttpStatus.OK).json({
          success: true,
          user: value,
        });
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        user: 'none',
      });
    });
  }

  //내 정보 수정
  @Patch('/myinfo/update/:nickname')
  updateUser(
    @Param('nickname') nickname: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res
  ) {
    this.usersService
      .updateUser(nickname, updateUserDto)
      .then((value: User) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          user: value,
        });
      });
  }

  //내가 쓴 댓글 조회
  @Get('myinfo/comments/:nickname')
  async findAllComment(
    @Param('nickname') nickname: string
  ): Promise<Comment[]> {
    const userList = await this.usersService.getAllComment(nickname);
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  // @Get('/myinfo/reviews')
  // findOne(@Param('nickname') nickname: string, @Res() res) {
  //   this.usersService.findByNickname(nickname).then((value: User) => {
  //     if (value) {
  //       return res.status(HttpStatus.OK).json({
  //         success: true,
  //         user: value,
  //       });
  //     }
  //     return res.status(HttpStatus.OK).json({
  //       success: true,
  //       user: 'none',
  //     });
  //   });
  // }

  @Get('/auth')
  findMe(@AuthUser() data: any, @Res() res) {
    if (!data || !data.userId) {
      return res.status(HttpStatus.OK).json({
        success: true,
        isAuth: false,
      });
    }
    this.usersService.findOne(data.userId).then((value: User) => {
      return res.status(HttpStatus.OK).json({
        success: true,
        isAuth: true,
        user: value,
      });
    });
  }

  @Delete('/logout')
  remove(@AuthUser() data: any, @Res() res) {
    if (!data.userId) {
      throw new HttpException('id is missing', HttpStatus.BAD_REQUEST);
    }
    this.usersService.remove(data.userId).then(() => {
      res.clearCookie('user_Access');
      return res.status(HttpStatus.OK).json({
        success: true,
      });
    });
  }
}
