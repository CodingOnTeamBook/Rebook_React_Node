import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import BookDetail from '../../components/common/BookDetail';
import TagsInput from '../../components/WriteReviewComponent/TagsInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200vh;
  padding: 3rem;
  background-color: ${(props) => props.theme.palette.yellow};
`;

const WriteReviewPage: FunctionComponent = () => {
  return (
    <Container>
      <h1>리뷰 쓰셈</h1>
      <BookDetail />
      <TagsInput />
    </Container>
  );
};

export default WriteReviewPage;
