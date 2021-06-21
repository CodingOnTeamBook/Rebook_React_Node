import Button from '@material-ui/core/Button';
import React, { FunctionComponent, useState } from 'react';
import SimpleModal from '../../components/common/SimpleModal';
import ReviewModal from '../../components/ReviewComponent/ReviewModal';

const ReviewMain: FunctionComponent = () => {
  const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  const ReviewModalOpen = () => {
    setReviewModalOpen(!isReviewModalOpen);
  };
  return (
    <div>
      <Button onClick={ReviewModalOpen}>리뷰 눌렀을 때 나오는 리뷰 모달</Button>
      <SimpleModal open={isReviewModalOpen} setOpen={ReviewModalOpen}>
        <ReviewModal handleClose={ReviewModalOpen}></ReviewModal>
      </SimpleModal>
    </div>
  );
};

export default ReviewMain;
