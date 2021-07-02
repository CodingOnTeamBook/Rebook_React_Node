import React, { FunctionComponent } from 'react';
import BookDetail from '../../components/BookDetail/BookDetail';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

const BookDetailPage: FunctionComponent = () => {
  return (
    <Container>
      <BookDetail />
    </Container>
  );
};

export default BookDetailPage;
