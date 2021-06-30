import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Header, Main } from './common/LandingPageCommon';
import ReviewMain from './ReviewComponent/ReviewMain';

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
        <ReviewMain />
        <ReviewMain />
        <ReviewMain />
      </ReviewContainer>
    </Container>
  );
};

export default PopulateReview;
