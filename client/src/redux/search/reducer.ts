import {
  FETCH_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_ERROR,
} from './search-type';

export type SearchState = {
  item: any[] | null;
  loading: boolean;
  error: boolean | null;
  msg: string | null;
};

const INITIAL_STATE = {
  item: null,
  loading: false,
  error: false,
  msg: null,
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
        msg: null,
      };
    case GET_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        error: false,
        msg: null,
      };
    case GET_SEARCH_RESULT_ERROR:
      return {
        ...state,
        item: null,
        loading: false,
        error: action.payload,
        msg: null,
      };
    case 'GET_NO_RESULT':
      return {
        ...state,
        item: null,
        loading: false,
        error: false,
        msg: action.payload,
      };
    default:
      return state;
  }
}
