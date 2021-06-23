import { Controller, Get, Param, Post, Delete, Patch, Body, Query, UseGuards } from '@nestjs/common';
import { throws } from 'assert';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('search')
  search(@Query('title') title: string){
    return `sdfsdf ${title}`;
  }
  
  @Get('/check/:nickname')
  getNick(@Param('nickname') nickname: string) {
    return this.usersService.checkNick(unescape(nickname));
    //return `${nickname}`;
  }

  @Get('/check/:id')
  getId(@Param('id') userId: string) {
    return this.usersService.checkId(userId);
  }

  //카카오로그인
  @Post('/login')
  kakaologin(@Body() user) {
      return this.usersService.kakaoLogin(user);
    }
  
  //카카오회원가입
  @Post('/signup')
  kakaosignup(@Body() user) {
    return this.usersService.createKakaoUser(user);
  }

  //로컬로그인 주소 임의
  @Post('/locallogin')
  locallogin(@Body() user) {
    return this.usersService.localLogin(user);
  }

  //로컬회원가입 주소 임의
  @Post('/localsignup')
  localsignup(@Body() user) {
    return this.usersService.createLocalUser(user);
  }

  //회원정보수정아직~!~!
  @UseGuards(JwtAuthGuard)
  @Post('/modifyuser')
  modifyUser(@Body() user) {
    return `d`;
  }

  @Delete('/deleteaccount')
  deleteac(@Body() user) {
    return this.usersService.remove(user);
  }

}
