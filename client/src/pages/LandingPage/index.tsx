import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CarouselComponent from '../../components/CarouselComponent';
import SearchForm from '../../components/SearchForm';
import RecommendedBooks from '../../components/RecommendedBooks';
import PopulateReview from '../../components/PopulateReviews';

const LandingContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingPage: FunctionComponent = () => {
  return (
    <>
      <LandingContainer>
        <CarouselComponent />
        <SearchForm />
        <RecommendedBooks />
        <PopulateReview />
      </LandingContainer>
    </>
  );
};

export default LandingPage;
