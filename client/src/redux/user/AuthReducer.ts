import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { FetchUserAuth } from '../../hooks/USER_API';
import { IAuthResponse, AuthState } from './type';

const GET_AUTH = 'GET_AUTH' as const;
const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS' as const;
const GET_AUTH_ERROR = 'GET_AUTH_ERROR' as const;

export const getAuth = () => ({
  type: GET_AUTH,
});

export const getAuthSuccess = (data: IAuthResponse) => ({
  type: GET_AUTH_SUCCESS,
  payload: data,
});

export const getAuthError = (error: AxiosError) => ({
  type: GET_AUTH_ERROR,
  payload: error,
});

type AuthAction =
  | ReturnType<typeof getAuth>
  | ReturnType<typeof getAuthSuccess>
  | ReturnType<typeof getAuthError>;

export function getAuthThunk(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AuthAction
> {
  return async (dispatch) => {
    dispatch(getAuth);
    try {
      const response = await FetchUserAuth();
      dispatch(getAuthSuccess(response));
    } catch (error: any) {
      dispatch(getAuthError(error));
    }
  };
}

export const AuthinitialState: AuthState = {
  loading: false,
  data: null,
  error: null,
};

export default function AuthReducer(
  state: AuthState = AuthinitialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
