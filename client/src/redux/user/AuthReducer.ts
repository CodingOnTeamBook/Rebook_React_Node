import axios, { AxiosError } from 'axios';
import { USER_SERVER } from '../../config';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';

const GET_AUTH = 'GET_AUTH' as const;
const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS' as const;
const GET_AUTH_ERROR = 'GET_AUTH_ERROR' as const;

export const getAuth = () => ({
  type: GET_AUTH,
});

export const getAuthSuccess = (data: IResponse) => ({
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

export type AuthState = {
  loading: boolean;
  data: IResponse | null;
  error: Error | null;
};

interface IResponse {
  success: boolean;
  isAuth: boolean;
  error: string;
}

async function FetchUserAuth(): Promise<IResponse> {
  const response = await axios.get<IResponse>(`${USER_SERVER}/auth`);
  return response.data;
}

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

const initialState: AuthState = {
  loading: false,
  data: null,
  error: null,
};

export default function AuthReducer(
  state: AuthState = initialState,
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
