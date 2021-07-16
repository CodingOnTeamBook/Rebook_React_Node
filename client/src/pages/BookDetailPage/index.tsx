import React, { FunctionComponent } from 'react';
import BookDetail from '../../components/common/BookDetail';
import BookReview from '../../components/BookDetail/BookReview';
import ReviewWriteBtn from '../../components/BookDetail/ReviewWriteBtn';
import { useHistory, useLocation } from 'react-router';

import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

export interface BookProps {
  isbn?: string;
  bookData?: any;
}

const BookDetailPage: FunctionComponent = () => {
  const location = useLocation<BookProps>();
  const { bookData } = location.state;
  console.log(bookData);

  // Todo
  // BookDetail에 넘겨주기
  // BookDetail은 reviewWrite에서도 쓰이니까 state로 상태관리 하면 될듯

  return (
    <Container>
      <BookDetail bookData={bookData} />
      <h1>REVIEW</h1>
      <BookReview />
      <ReviewWriteBtn />
    </Container>
  );
};

export default BookDetailPage;
