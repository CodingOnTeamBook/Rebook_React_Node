import React, { FunctionComponent, useState, useEffect } from 'react';
import AddComment from '../../components/ReviewDetailComponent/AddComment';
import BookInfo from '../../components/ReviewDetailComponent/BookInfo';
import UserReview from '../../components/ReviewDetailComponent/UserReview';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CommentList from '../../components/ReviewDetailComponent/CommentList';
import { useParams } from 'react-router';
import axios from 'axios';

const ReviewDetailContainer = styled(Grid)`
  border-radius: 20px;
  background-color: #f6f6f6;
  margin-top: 50px;
`;

const BookInfoWrapper = styled(Grid)`
  width: 100%;
  border-radius: 20px;
  padding: 5% 5% 0 5%;
`;

const ReviewDetailWrapper = styled(Grid)`
  width: 100%;
  padding: 5%;
  margin-bottom: 50px;
`;

const MarginTop = styled.div`
  margin-top: 30px;
`;

interface IdType {
  id: string;
}

const ReviewDetailPage: FunctionComponent = () => {
  const [reviewDetail, setReviewDetail] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams<IdType>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(null);
        setReviewDetail([]);
        setLoading(true);
        const res = await axios.post('/api/review/detail', {
          reviewid: id,
        });
        setReviewDetail(res.data.review.review);
        console.log(res.data.review.review);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <ReviewDetailContainer>
      {reviewDetail.map((review) => (
        <>
          <BookInfoWrapper>
            <BookInfo />
          </BookInfoWrapper>
          <ReviewDetailWrapper
            container
            direction="column"
            alignContent="center"
          >
            <UserReview
              key={review.id}
              id={review.id}
              score={review.score}
              summary={review.summary}
              nickname={review.user.nickname}
              updatedTime={review.updatedAt}
              like_count={review.like_count}
            />
            <MarginTop />
            <CommentList />
            <AddComment />
          </ReviewDetailWrapper>
        </>
      ))}
    </ReviewDetailContainer>
  );
};

export default ReviewDetailPage;
