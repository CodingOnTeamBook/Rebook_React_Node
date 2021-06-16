import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BookCard from './BookCard';

const BookDetailModalContainer = styled.div`
  position: absolute;
  width: 500px;
  background-color: ${(props) => props.theme.palette.white};
`;

const CloseButtonArea = styled.div`
  text-align: right;
`;

const BookDetailModalContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
        <BookCard />
      </BookDetailModalContents>
    </BookDetailModalContainer>
  );
};

export default BookDetailModal;
