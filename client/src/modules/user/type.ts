import { IAuthResponse } from '../../API/USER_PRIVATE_API/user.interface';

export type AuthState = {
  loading: boolean;
  data: IAuthResponse | null;
  error: Error | null;
};
