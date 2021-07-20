import { SET_BOOK_INFO } from './book-type';
import { bookInfo } from './action';

export type BookState = {
  bookInfo: bookInfo | null;
};

const INITIAL_STATE = {
  bookInfo: null,
};

export default function BookReducer(
  state: BookState = INITIAL_STATE,
  action: any
): BookState {
  switch (action.type) {
    case SET_BOOK_INFO:
      return {
        bookInfo: action.payload,
      };
    default:
      return state;
  }
}
