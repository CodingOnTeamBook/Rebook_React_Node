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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { AuthUser } from './users.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { usersmulterOptions } from './users.multerOptions';
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

  @Patch('/myinfo/update')
  @UseInterceptors(FileInterceptor('profileImg', usersmulterOptions))
  update(
    @AuthUser() data: any,
    @UploadedFile() file: File[],
    @Body() updateUserDto: UpdateUserDto,
    @Res() res
  ) {
    this.usersService
      .update(data.userId, file, updateUserDto)
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

  @Get('/myinfo/reviews/:nickname')
  async getReviews(@Param('nickname') nickname: string) {
    const reviews = await this.usersService.getMyReviews(nickname);
    return reviews;
  }

  @Get('/myinfo/likes/:nickname')
  async getLikes(@Param('nickname') nickname: string) {
    console.log('nickname', nickname);
    const likes = await this.usersService.getMyLikes(nickname);
    return likes;
  }

  //팔로우기능
  @Post('/follow')
  async followUser(
    @AuthUser() data: any,
    @Body() nickname: string,
    @Res() res
  ) {
    return this.usersService.followUser(data.userId, nickname).then((value) => {
      if (value === '1') {
        res.status(HttpStatus.OK).json({
          success: true,
          error: 1,
          message: 'User not found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          success: true,
          result: value,
        });
      }
    });
  }

  //언팔로우기능
  @Post('/unfollow')
  async unfollowUser(
    @AuthUser() data: any,
    @Body() nickname: string,
    @Res() res
  ) {
    return this.usersService
      .unfollowUser(data.userId, nickname)
      .then((value) => {
        if (value === '1') {
          res.status(HttpStatus.OK).json({
            success: true,
            error: 1,
            message: 'User not found',
          });
        } else {
          res.status(HttpStatus.OK).json({
            success: true,
            result: value,
          });
        }
      });
  }

  //nickname으로 유저 서치
  @Get('/search/:nickname')
  getUserByNick(@Param('nickname') nickname: string, @Res() res) {
    return this.usersService
      .getUserByNickname(nickname)
      .then((value) => {
        if (value === '1') {
          res.status(HttpStatus.OK).json({
            success: true,
            error: 1,
            message: 'User not found',
          });
        } else {
          res.status(HttpStatus.OK).json({
            success: true,
            users: value,
          });
        }
      })
      .catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          result: err,
        });
      });
  }
}
