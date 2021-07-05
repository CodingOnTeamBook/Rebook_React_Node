import React, { FunctionComponent } from 'react';
import BookDetail from '../../components/BookDetail/BookDetail';
import BookReview from '../../components/BookDetail/BookReview';

import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

const BookDetailPage: FunctionComponent = () => {
  return (
    <Container>
      <BookDetail />
      <h1>REVIEW</h1>
      <BookReview />
    </Container>
  );
};

export default BookDetailPage;
