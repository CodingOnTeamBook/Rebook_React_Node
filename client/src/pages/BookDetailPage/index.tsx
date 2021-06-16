import Button from '@material-ui/core/Button';
import React, { FunctionComponent, useState } from 'react';
import SimpleModal from '../../components/common/SimpleModal';
import BookDetailModal from '../../components/BookDetailComponent/BookDetailModal';

const BookDetailPage: FunctionComponent = () => {
  const [isBookDetailModalOpen, setIsBookDetailModalOpen] =
    useState<boolean>(false);

  const BookDetailModalOpen = () => {
    setIsBookDetailModalOpen(!isBookDetailModalOpen);
  };
  return (
    <div>
      <Button onClick={BookDetailModalOpen}>책 눌렀을 때 나오는 모달</Button>
      <SimpleModal open={isBookDetailModalOpen} setOpen={BookDetailModalOpen}>
        <BookDetailModal handleClose={BookDetailModalOpen}></BookDetailModal>
      </SimpleModal>
    </div>
  );
};

export default BookDetailPage;
