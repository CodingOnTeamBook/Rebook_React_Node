import { SET_KEYWORD, RESET_KEYWORD, GET_SEARCH_RESULT } from './search-type';

const INITIAL_STATE = {
  keyword: '',
  data: [],
};

type SearchState = {
  keyword: string;
  data: any[] | null;
};

export default function SearchReducer(
  state: SearchState = INITIAL_STATE,
  action: any
): SearchState {
  switch (action.type) {
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        data: null,
      };
    case RESET_KEYWORD:
      return {
        ...state,
        keyword: '',
        data: null,
      };
    case GET_SEARCH_RESULT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
