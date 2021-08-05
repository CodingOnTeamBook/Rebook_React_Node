import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Header, Main } from '../common/LandingPageCommon';
import SmallReview from '../myPage/SmallReview';
import GridLayout from '../common/GridLayout';
import GridItem from '../common/GridItem';

const ReviewContainer = styled(Main)``;
const MoreInfo = styled(Link)`
  h3 {
    margin-top: 32px;
  }
  h3:hover {
    color: ${(props) => props.theme.palette.green};
  }
`;

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
  reviews: Array<review>;
}

const PopulateReview = ({ reviews }: Iprops) => {
  if (!reviews?.length) {
    return (
      <Container>
        <Header>
          <h2>지금 핫한🔥 리뷰</h2>
          <MoreInfo to="/review">
            <h3>더보기</h3>
          </MoreInfo>
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
        <h2>지금 핫한🔥 리뷰</h2>
        <MoreInfo to="/review">
          <h3>더보기</h3>
        </MoreInfo>
      </Header>
      <ReviewContainer>
        <GridLayout>
          <>
            {reviews?.map((review: review, index: number) => (
              <GridItem key={index}>
                <SmallReview like={false} review={review} />
              </GridItem>
            ))}
          </>
        </GridLayout>
      </ReviewContainer>
    </Container>
  );
};

export default PopulateReview;
