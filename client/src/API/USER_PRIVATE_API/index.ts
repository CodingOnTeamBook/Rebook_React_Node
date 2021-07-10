import axios from 'axios';
import { USER_SERVER } from '../../config';
import {
  IsendUser,
  IAuthResponse,
  ILoginResponse,
  ISignupAndUpdateResponse,
  ILogoutResponse,
} from './user.interface';

export async function Signup(
  user: IsendUser
): Promise<ISignupAndUpdateResponse> {
  const response = await axios.post(`${USER_SERVER}/signup`, user);
  return response.data;
}

export async function login(kakaoId: number): Promise<ILoginResponse> {
  const response = await axios.post(`${USER_SERVER}/login`, { kakaoId });
  return response.data;
}

export async function auth(): Promise<IAuthResponse> {
  const response = await axios.get(`${USER_SERVER}/auth`);
  return response.data;
}

export async function logout(): Promise<ILogoutResponse> {
  const response = await axios.delete(`${USER_SERVER}/logout`);
  return response.data;
}
