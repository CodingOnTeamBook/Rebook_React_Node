import { NonNullExpression } from 'typescript';
import {
  FETCH_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_ERROR,
} from './search-type';

export type SearchState = {
  item: any[] | null;
  loading: boolean;
  error: boolean;
};

const INITIAL_STATE = {
  item: null,
  loading: false,
  error: false,
};

export default function SearchReducer(
  state: SearchState = INITIAL_STATE,
  action: any
): SearchState {
  switch (action.type) {
    case FETCH_SEARCH_RESULT:
      return {
        ...state,
        item: null,
        loading: true,
        error: false,
      };
    case GET_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        error: false,
      };
    case GET_SEARCH_RESULT_ERROR:
      return {
        ...state,
        item: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
