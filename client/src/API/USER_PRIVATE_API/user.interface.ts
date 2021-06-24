export interface IUser {
  id: number;
  userId: string;
  username: string;
  gender: string;
  ageRange: string;
  genres: string;
  info: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IsendUser {
  kakaoId: string;
  nickName: string;
  genre: string;
  gender?: string;
  ageRange?: string;
  info?: string;
  imgUrl?: string;
}

export interface ISignupAndUpdateResponse {
  success: boolean;
  user: IUser;
}

export interface ILoginResponse {
  success: boolean;
  type: 1 | 0;
  userId?: string;
  accessToken?: string;
}

export interface IAuthResponse {
  success: boolean;
  isAuth: boolean;
  user: IUser;
}

export interface ILogoutResponse {
  success: boolean;
}
