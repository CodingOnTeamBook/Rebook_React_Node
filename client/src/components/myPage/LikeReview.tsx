import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SmallReview from './SmallReview';
import GridLayout from 'layout/Grid';
import GridMediumItem from 'layout/GridMediumItem';
import { getMyLike } from 'API/USER_PRIVATE_API';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/rootReducer';

interface review {
  bookCover: string;
  bookTitle: string;
  id: number;
  like_count: number;
  score: number;
  summary: string;
  tags: Array<string>;
  writer: string;
}

const NoReview = styled.div`
  width: 100%;
  padding: 2rem;
  text-align: center;
  margin-top: 3rem;
`;

const LikeReview = () => {
  const [reviews, SetReviews] = useState<any>(null);
  const { data } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (data) {
      getMyLike(data.user.nickname).then((response) => SetReviews(response));
    }
  }, []);
  return (
    <GridLayout>
      {reviews?.map((review: review, index: number) => (
        <GridMediumItem key={index}>
          <SmallReview like={true} review={review} />
        </GridMediumItem>
      ))}
      {reviews && reviews.length == 0 && (
        <NoReview>아직 좋아요 한 리뷰가 없습니다.</NoReview>
      )}
    </GridLayout>
  );
};

export default LikeReview;
