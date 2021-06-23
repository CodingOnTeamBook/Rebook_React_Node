import { Body, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IIsAuthResponse {
  success: boolean,
  isAuth?: boolean,
  user?: object,
  error?: string,
}

@Injectable()
export class AuthService {
  constructor(
    //private jwtStrategy = new JwtStrategy,
    private jwtService: JwtService
  ) {}

  async vaildateUser(@Body() user) {
  //  const userToken = await this.jwtService.verify()
  }

  async isAuth(user: any, token: string): Promise<IIsAuthResponse> {
    const bearer = token.split(' ');
    try {
      const decoded = await this.jwtService.verify(bearer[1]);
      return ({
        success: true,
        isAuth: true, //로그인상태?
        user: decoded //userId, nickname, iat, exp 보내줌
      })
    } catch (err) {
      if(err.name === 'TokenExpiredError') {
        return({
          success: false,
          error: err,
        })
      }
      return ({
        success: false,
        error: err,
      });
    }
  }

  //토큰발행
  async signToken(user: any) { 
    const payload = { userId: user.userId, nickname: user.nickname };
    return this.jwtService.sign(payload);
  }
}
