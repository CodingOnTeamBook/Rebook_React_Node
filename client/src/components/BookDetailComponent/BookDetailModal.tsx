import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BookDetailInfo from './BookDetailInfo';
import ReviewComponent from './BookDetailReview';
import BookDetailComment from './BookDtailComment';

const BookDetailModalContainer = styled.div`
  position: absolute;
  width: 500px;
  border-radius: 5px;
  /* padding: 20px; */
  background-color: white;
`;

const CloseButtonArea = styled.div`
  text-align: right;
`;

const BookDetailModalContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #141414;
`;

interface BookDetailDialogProps {
  handleClose: () => void;
}

const BookDetailModal: FunctionComponent<BookDetailDialogProps> = ({
  handleClose,
}: BookDetailDialogProps) => {
  return (
    <BookDetailModalContainer>
      <CloseButtonArea>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </CloseButtonArea>
      <BookDetailModalContents>
        <BookDetailInfo />
        <ReviewComponent />
        <BookDetailComment />
      </BookDetailModalContents>
    </BookDetailModalContainer>
  );
};

export default BookDetailModal;
