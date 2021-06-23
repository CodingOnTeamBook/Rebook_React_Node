import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthService } from 'src/auth/auth.service';
import { bcrypt } from 'bcrypt';

export interface ICheckResponse {
  success: boolean,
  result: boolean,
}
export interface ILoginResponse{
  success: boolean,
  userId?: string,
  type?: number,
  accessToken?: string,
  error?: string,
}

export interface ICreateUserResponse{
  success: boolean,
  userId?: string,
  error?: string,
}


export interface IDeleteAccountResponse{
  success: boolean,
  error?: string,
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private authService: AuthService,
  ) {}

  async findOne(userId: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        userId,
      },
    });
  }

  //닉네임 중복체크
  async checkNick(nickname: string): Promise<ICheckResponse> {
    const exNick = await this.userModel.findOne({ where: { nickname } });
    if(!exNick){
      return ({
        success: true,
        result: true,
      })
    } else {
      return({
        success: true,
        result: false,
      })
    }
  }
  
  //아이디 중복체크
  async checkId(userId: string): Promise<ICheckResponse> {
    const exId = await this.userModel.findOne({ where: { userId }});
    if(!exId){
      return ({
        success: true,
        result: true,
      })
    } else {
      return({
        success: true,
        result: false,
      })
    }
  }

  //카카오로그인
  async kakaoLogin(user: any): Promise<ILoginResponse>{
    const userId = user.kakaoId;
    try {
      const exUser = await this.userModel.findOne({ where: { userId }});
      if (exUser) {
        return({
          userId: userId,
          success: true,
          type: 1,
          accessToken: await this.authService.signToken(exUser),
        });
      } else {
        return({
          success: true,
          type: 0,
        });
      }
    } catch (err) {
      return({
        success: false,
        error: err,
      });
    };
  }
  
  //카카오회원가입
  async createKakaoUser(user: any): Promise<ICreateUserResponse> {
    const { kakaoId, nickname, genre, gender, age_range, avartarImg } = user;
    try {
      await this.userModel.create({
        userId: kakaoId,
        nickname: nickname,
        provider: 'kakao',
        genres: genre, //몰라 일단 넣어ㅜ
        gender: gender,
        ageRange: age_range,
        profileImg: avartarImg,
      })
      return({
        success: true,
        userId: kakaoId,      
      })
    } catch (err) {
      return({
        success: false,
        error: err,
      })
    }
  }

  //로컬회원가입
  async createLocalUser(user: any): Promise<ICreateUserResponse> {
    const { userId, nickname, password, genre, gender, age_range, avartarImg } = user;
    try {
      const hash = await bcrypt(password, 12);
      await this.userModel.create({
        userId: userId,
        nickname: nickname,
        password: hash,
        provider: 'local',
        genres: genre, //몰라 일단 넣어ㅜ
        gender: gender,
        ageRange: age_range,
        profileImg: avartarImg,
      })
      return({
        success: true,
        userId: userId,      
      })
    } catch (err) {
      return({
        success: false,
        error: err,
      })
    }
  }

  //로컬로그인..
  async localLogin(user: any): Promise<ILoginResponse> {
    const { userId, password } = user;
    try {
      const correctUser = await this.userModel.findOne({ where: { userId }});
      if (correctUser) {
        const result = await bcrypt.compare(password, correctUser.password);
        if (result) {
          return({
            success: true,
            userId: userId,
            type: 1,
            accessToken: await this.authService.signToken(correctUser),
          })
        } else { //아이디 혹은 비밀번호가 일치하지 않습니다.
          return ({
            success: true,
            type: 2, //임의!!
          })
        }
      } else { //아이디 혹은 비밀번호가 일치하지 않습니다.
        return ({
          success: true,
          type: 2, //임의!!
        })
      }
    } catch (err) {
      return({
        success: false,
        error: err,
      })
    }
  }

  //회원탈퇴..?
  async remove(user: any): Promise<IDeleteAccountResponse> {
    const userId = user.userId;
    try{
      await this.userModel.destroy({ where: { userId }});
      return({
        success: true,
      })
    } catch (err) {
      return({
        success: false,
        error: err,
      });
    }
  }
}
