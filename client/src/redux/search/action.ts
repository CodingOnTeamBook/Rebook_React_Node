import axios from 'axios';
import { Dispatch } from 'redux';
import { SET_KEYWORD, RESET_KEYWORD, GET_SEARCH_RESULT } from './search-type';

export type SearchAction =
  | ReturnType<typeof setKeyword>
  | ReturnType<typeof resetKeyword>
  | ReturnType<typeof getSearchResult>;

export const setKeyword = (keyword: string) => {
  return {
    type: SET_KEYWORD,
    payload: keyword,
  };
};

export const resetKeyword = () => {
  return {
    type: RESET_KEYWORD,
  };
};

export const getSearchResult = (data: any[]) => {
  return {
    type: GET_SEARCH_RESULT,
    payload: data,
  };
};

// export function getBookInfo(inputValue: string) {
//   return async (dispatch: Dispatch) => {
//     try {
//       const res = await axios.get(`api/book/search?title=${inputValue}`);
//       console.log(res);
//       dispatch(getSearchResult(res.data.books.item));
//     } catch (e) {
//       console.log(e);
//     }
//   };
// }
