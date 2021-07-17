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

const BookDetailPage: FunctionComponent = () => {
  const location = useLocation();
  console.log(location);
  // Todo
  // BookReview 컴포넌트에서 최신순 or 인기순 클릭시 백에 isbn 데이터 넘겨야 함
  return (
    <Container>
      <BookDetail />
      <h1>REVIEW</h1>
      <BookReview />
      <ReviewWriteBtn />
    </Container>
  );
};

export default BookDetailPage;
