import axios from 'axios';
import { USER_SERVER } from '../../config';
import {
  ICheckNickNameResponse,
  ISearchUserByNicknameResponse,
} from './user.interface';

export async function CheckNickname(
  nickname: string
): Promise<ICheckNickNameResponse> {
  const response = await axios.get(`${USER_SERVER}/check/${nickname}`);
  return response.data;
}

export async function SearchByNickname(
  nickname: string
): Promise<ISearchUserByNicknameResponse> {
  const response = await axios.get(`${USER_SERVER}/info/${nickname}`);
  return response.data;
}
