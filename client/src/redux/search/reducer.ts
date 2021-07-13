import {
  FETCH_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_ERROR,
} from './search-type';

const INITIAL_STATE = {
  item: [],
  loading: false,
  error: null,
};

export default function SearchReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_SEARCH_RESULT:
      return {
        ...state,
        loading: true,
        item: [],
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
        error: action.payload,
        loading: false,
        item: [],
      };
    default:
      return state;
  }
}
