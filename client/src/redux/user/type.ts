export type AuthState = {
    loading: boolean;
    data: IAuthResponse | null;
    error: Error | null;
  };

export interface IAuthResponse {
    success: boolean;
    isAuth: boolean;
    error: string;
  };