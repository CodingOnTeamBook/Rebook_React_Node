import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Header, Main } from '../common/LandingPageCommon';
import SmallReview from '../myPage/SmallReview';
import GridLayouot from '../common/GridLayout';
import GridItem from '../common/GridItem';

const ReviewContainer = styled(Main)``;
const NoReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 0;
  margin-bottom: 5em;
  width: 100%;
  height: 40vh;
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(241, 241, 241, 1) 100%
  );
  border-radius: 12px;

  h1 {
    margin: 0 auto;
  }
`;

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

interface Iprops {
  reviews: Array<review> | null;
}

const PopulateReview = ({ reviews }: Iprops) => {
  if (!reviews?.length) {
    return (
      <Container>
        <Header>
          <h2>인기 리뷰</h2>
          <h3>
            <Link to="/review">더보기</Link>
          </h3>
        </Header>
        <NoReview>
          <h1>아직 리뷰가 없어요😅</h1>
          <h3>리북의 첫 리뷰어가 되어주세요!</h3>
        </NoReview>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h2>인기 리뷰</h2>
        <h3>
          <Link to="/review">더보기</Link>
        </h3>
      </Header>
      <ReviewContainer>
        <GridLayouot>
          <>
            {reviews?.map((review: review, index: number) => (
              <GridItem key={index}>
                <SmallReview like={false} review={review} />
              </GridItem>
            ))}
          </>
        </GridLayouot>
      </ReviewContainer>
    </Container>
  );
};

export default PopulateReview;
