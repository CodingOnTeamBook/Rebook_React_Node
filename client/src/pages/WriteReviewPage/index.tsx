import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import BookDetail from '../../components/common/BookDetail';
import TagsInput from '../../components/WriteReviewComponent/TagsInput';
import WriteEditor from '../../components/WriteReviewComponent/WriteEditor';
import StarRate from '../../components/WriteReviewComponent/StarRate';
import ToggleBtn from '../../components/WriteReviewComponent/ToggleBtn';
import SubmitBtn from '../../components/WriteReviewComponent/SubmitBtn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.white};
`;

const Title = styled.h1`
  margin-bottom: 0;
  background-color: white;
`;

const WriteReviewPage: FunctionComponent = () => {
  return (
    <Container>
      <Title>리뷰 작성</Title>
      <BookDetail />
      <WriteEditor />
      <TagsInput />
      <StarRate />
      <ToggleBtn />
      <SubmitBtn />
    </Container>
  );
};

export default WriteReviewPage;
