import { IUser } from '../USER_PRIVATE_API/user.interface';

export interface ICheckNickNameResponse {
  success: boolean;
  results: boolean;
  error?: boolean;
}

export interface ISearchUserByNicknameResponse {
  success: boolean;
  user: IUser | 'none';
}
