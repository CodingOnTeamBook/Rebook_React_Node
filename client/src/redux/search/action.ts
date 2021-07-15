import axios from 'axios';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';

import {
  FETCH_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_ERROR,
  GET_NO_RESULT,
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

export const getNoResult = (msg: string) => {
  return {
    type: GET_NO_RESULT,
    payload: msg,
  };
};

export const fetchApi = (query: string, page: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchSearchResult());
    axios
      .get(`api/book/search?title=${query}&page=${page}`)
      .then(
        ({
          data: {
            books: { item },
          },
        }) => {
          item.length
            ? dispatch(getSearchResultSuccess(item))
            : dispatch(getNoResult(`${query} 의 검색 결과가 없어요😢`));
        }
      )
      .catch((error) => dispatch(getSearchResultError(error)));
  };
};
