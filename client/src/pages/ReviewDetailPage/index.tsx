import React, { FunctionComponent } from 'react';
import AddComment from '../../components/ReviewDetailComponent/AddComment';
import BookInfo from '../../components/ReviewDetailComponent/BookInfo';
import UserReview from '../../components/ReviewDetailComponent/UserReview';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CommentList from '../../components/ReviewDetailComponent/CommentList';

const ReviewDetailContainer = styled(Grid)`
  margin-top: 30px;
  margin-bottom: 30px;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ReviewDetailPage: FunctionComponent = () => {
  return (
    <ReviewDetailContainer container direction="column" alignContent="center">
      <BookInfo />
      <UserReview />
      <CommentList />
      <AddComment />
    </ReviewDetailContainer>
  );
};

export default ReviewDetailPage;
