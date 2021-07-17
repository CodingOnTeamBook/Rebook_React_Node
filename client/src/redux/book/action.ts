import { SET_BOOK_INFO } from './book-type';

interface bookInfo {
  isbn: string;
  link: string;
  cover: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  description: string;
}

interface bookProps {
  bookInfo: bookInfo[];
}

export const setBookInfo = (bookProps: bookProps) => {
  return {
    type: SET_BOOK_INFO,
    payload: bookProps,
  };
};
