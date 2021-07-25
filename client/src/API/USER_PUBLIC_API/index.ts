import axios from 'axios';
import { REVIEW_SERVER, USER_SERVER } from '../../config';
import {
  ICheckNickNameResponse,
  ISearchUserByNicknameResponse,
} from './user.interface';

export async function CheckNickname(
  nickname: string
): Promise<ICheckNickNameResponse> {
  const response = await axios.get<ICheckNickNameResponse>(
    `${USER_SERVER}/check/${nickname}`
  );
  return response.data;
}

// 닉네임 일치하는 유저만 출력
export async function SearchByNickname(
  nickname: string
): Promise<ISearchUserByNicknameResponse> {
  const response = await axios.get(`${USER_SERVER}/info/${nickname}`);
  return response.data;
}

// 유사한 닉네임을 가진 유저들까지 모두 출력
export async function SearchUsersByNickname(nickname: string): Promise<any> {
  const response = await axios.get(`${USER_SERVER}/search/${nickname}`);
  return response.data;
}

export async function UnLike(reviewid: number) {
  const response = await axios.post(`${REVIEW_SERVER}/unlike`, { reviewid });
  return response.data;
}

export async function Like(reviewid: number) {
  const response = await axios.post(`${REVIEW_SERVER}/like`, { reviewid });
  return response.data;
}
