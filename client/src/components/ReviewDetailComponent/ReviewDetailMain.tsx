import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import BookInfo from './BookInfo';
import UserReview from './UserReview';
import AddComment from './AddComment';
import Grid from '@material-ui/core/Grid';

const ReviewModalContainer = styled.div`
  max-width: 500px;
  flex-grow: 1;
  background-color: white;
  height: 100%;
`;

const ReviewDetailMain: FunctionComponent = () => {
  return (
    <ReviewModalContainer>
      <Grid item zeroMinWidth>
        <BookInfo />
        <UserReview />
        <AddComment />
      </Grid>
    </ReviewModalContainer>
  );
};

export default ReviewDetailMain;
