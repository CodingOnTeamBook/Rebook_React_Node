import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BookInfo from './BookInfo';
import UserReview from './UserReview';
import AddComment from './AddComment';
import Grid from '@material-ui/core/Grid';

const ReviewModalContainer = styled.div`
  max-width: 500px;
  flex-grow: 1;
  overflow: auto;
  background-color: white;
  height: 100%;
  padding-bottom: 10px;
  border-radius: 10px;
`;

const CloseButtonArea = styled.div`
  background-color: white;
  text-align: right;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

interface ReviewModalProps {
  handleClose: () => void;
}

const ReviewModal: FunctionComponent<ReviewModalProps> = ({
  handleClose,
}: ReviewModalProps) => {
  return (
    <ReviewModalContainer>
      <Grid item zeroMinWidth>
        <CloseButtonArea>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </CloseButtonArea>
        <BookInfo />
        <UserReview />
        <AddComment />
      </Grid>
    </ReviewModalContainer>
  );
};

export default ReviewModal;
