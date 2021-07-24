import { SET_BOOK_INFO } from './book-type';

export interface bookInfo {
  isbn13: string;
  link: string;
  cover: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
}

export const setBookInfo = (bookInfo: bookInfo) => {
  return {
    type: SET_BOOK_INFO,
    payload: bookInfo,
  };
};
