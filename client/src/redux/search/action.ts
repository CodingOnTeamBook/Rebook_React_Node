import axios from 'axios';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';

import {
  FETCH_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_ERROR,
} from './search-type';

export const fetchSearchResult = () => {
  return {
    type: FETCH_SEARCH_RESULT,
  };
};

export const getSearchResultSuccess = (item: []) => {
  return {
    type: GET_SEARCH_RESULT_SUCCESS,
    payload: item,
  };
};

export const getSearchResultError = (error: AxiosError) => {
  return {
    type: GET_SEARCH_RESULT_ERROR,
    payload: error,
  };
};

type SearchAction =
  | ReturnType<typeof fetchSearchResult>
  | ReturnType<typeof getSearchResultSuccess>
  | ReturnType<typeof getSearchResultError>;

// export const fetchApi = (
//   query: string
// ): ThunkAction<Promise<void>, RootState, null, SearchAction> => {
//   console.log('fetchApi()'); //디버깅용
//   console.log(query); //디버깅용

//   return async (dispatch) => {
//     dispatch(fetchSearchResult);
//     try {
//       const res = await axios.get(`api/book/search?title=${query}`);
//       dispatch(getSearchResultSuccess(res.data.books.item));
//     } catch (error: any) {
//       dispatch(getSearchResultError(error));
//     }
//   };
// };

export const fetchApi = (query: string) => {
  console.log('fetchApi()'); //디버깅용

  return async (dispatch: Dispatch) => {
    dispatch(fetchSearchResult());
    try {
      const res = await axios.get(`api/book/search?title=${query}`);
      dispatch(getSearchResultSuccess(res.data.books.item));
    } catch (error: any) {
      dispatch(getSearchResultError(error));
    }
  };
};
