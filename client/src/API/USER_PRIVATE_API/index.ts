import axios from 'axios';
import { USER_SERVER, REVIEW_SERVER } from '../../config';
import {
  IsendUser,
  IAuthResponse,
  ILoginResponse,
  ISignupAndUpdateResponse,
  ILogoutResponse,
  IImgUpdate,
  IUpdate,
  IPopulateReview,
  IPrivateReview,
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

export async function ImgUpdate(img: File): Promise<IImgUpdate> {
  const formData = new FormData();
  formData.append('profileImg', img);
  const response = await axios.post(`${USER_SERVER}/updateImg`, formData, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  return response.data;
}

export async function update(formData: any): Promise<IUpdate> {
  const response = await axios.patch(`${USER_SERVER}/myinfo/update`, formData);
  return response.data;
}

export async function getPublicReview(page: number): Promise<IPopulateReview> {
  const response = await axios.get(
    `${USER_SERVER}/myPublicReview?page=${page}`
  );
  return response.data;
}

export async function getPrivateReview(page: number): Promise<IPrivateReview> {
  const response = await axios.get(
    `${USER_SERVER}/myPrivateReview?page=${page}`
  );
  return response.data;
}

export async function getMyLike(nickname: string) {
  const response = await axios.get(`${USER_SERVER}/myinfo/likes/${nickname}`);
  return response.data;
}

export async function DeleteMyReview(reviewid: number) {
  const response = await axios.delete(`${REVIEW_SERVER}/delete`, {
    data: { reviewid },
  });
  return response.data;
}
