import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import BookDetail from '../../components/common/BookDetail';
import TagsInput from '../../components/WriteReviewComponent/TagsInput';
import WriteEditor from '../../components/WriteReviewComponent/WriteEditor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200vh;
  padding: 3rem;
  background-color: ${(props) => props.theme.palette.white};
`;

const WriteReviewPage: FunctionComponent = () => {
  return (
    <Container>
      <h1>리뷰 쓰셈</h1>
      <BookDetail />
      <WriteEditor />
      <TagsInput />
    </Container>
  );
};

export default WriteReviewPage;
