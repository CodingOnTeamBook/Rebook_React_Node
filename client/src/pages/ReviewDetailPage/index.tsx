import React, { FunctionComponent } from 'react';
import AddComment from '../../components/ReviewDetailComponent/AddComment';
import BookInfo from '../../components/ReviewDetailComponent/BookInfo';
import UserReview from '../../components/ReviewDetailComponent/UserReview';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CommentList from '../../components/ReviewDetailComponent/CommentList';

const ReviewDetailContainer = styled(Grid)`
  border-radius: 20px;
  background-color: #e2e2e2;
  margin-top: 50px;
`;

const BookInfoWrapper = styled(Grid)`
  width: 100%;
  border-radius: 20px;
  padding: 5%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  background-color: ${(props) => props.theme.palette.green};
`;

const ReviewDetailWrapper = styled(Grid)`
  width: 100%;
  padding: 3%;
  margin-bottom: 50px;
`;

const MarginTop = styled.div`
  margin-top: 30px;
`;

const ReviewDetailPage: FunctionComponent = () => {
  return (
    <ReviewDetailContainer>
      <BookInfoWrapper>
        <BookInfo />
      </BookInfoWrapper>
      <ReviewDetailWrapper container direction="column" alignContent="center">
        <UserReview />
        <CommentList />
        <MarginTop />
        <AddComment />
      </ReviewDetailWrapper>
    </ReviewDetailContainer>
  );
};

export default ReviewDetailPage;
