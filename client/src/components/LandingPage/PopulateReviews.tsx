import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Header, Main } from '../common/LandingPageCommon';
import SmallReview from '../myPage/SmallReview';
import GridLayouot from '../common/GridLayout';
import GridItem from '../common/GridItem';

const ReviewContainer = styled(Main)``;

const PopulateReview: FunctionComponent = () => {
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
            <GridItem>
              <SmallReview like={false} />
            </GridItem>
            <GridItem>
              <SmallReview like={false} />
            </GridItem>
            <GridItem>
              <SmallReview like={false} />
            </GridItem>
          </>
        </GridLayouot>
      </ReviewContainer>
    </Container>
  );
};

export default PopulateReview;
