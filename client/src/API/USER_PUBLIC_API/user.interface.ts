import { IUser } from '../USER_PRIVATE_API/user.interface';

export interface ICheckNickNameResponse {
  success: boolean;
  result: boolean;
  error?: boolean;
}

export interface ISearchUserByNicknameResponse {
  success: boolean;
  user: IUser | 'none';
}
