import axios from 'axios';
import { USER_SERVER } from '../../config';

export interface IAuthResponse {
  success: boolean;
  isAuth: boolean;
  error: string;
}

export interface IUserResponse {
  success: boolean;
  type?: number;
  error?: string;
  userId?: number;
  accessToken?: string;
}

export interface ISignupUserInfo {
  userId: number;
  nickname: string;
  gender: string;
  avartarImg: string;
  genre: Array<string>;
}

export async function FetchUserAuth(): Promise<IAuthResponse> {
  const response = await axios.get(`${USER_SERVER}/auth`);
  return response.data;
}

export async function FetchUserLogin(userId: number): Promise<IUserResponse> {
  const response = await axios.post(`${USER_SERVER}/login`, {
    kakaoId: userId,
  });
  return response.data;
}

export async function FetchUserSignup(
  user: ISignupUserInfo
): Promise<IUserResponse> {
  const response = await axios.post(`${USER_SERVER}/signup`, user);
  return response.data;
}

export async function FetchUserLogout(userId: number): Promise<IUserResponse> {
  const response = await axios.delete(`${USER_SERVER}/logout`, {
    data: { userId },
  });
  return response.data;
}
