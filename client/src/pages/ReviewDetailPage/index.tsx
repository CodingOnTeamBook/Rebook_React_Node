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
  width: 100%;
`;

const MarginTop = styled.div`
  margin-top: 20px;
`;

const ReviewDetailPage: FunctionComponent = () => {
  return (
    <ReviewDetailContainer container direction="column" alignContent="center">
      <BookInfo />
      <MarginTop />
      <UserReview />
      <MarginTop />
      <CommentList />
      <MarginTop />
      <AddComment />
    </ReviewDetailContainer>
  );
};

export default ReviewDetailPage;
