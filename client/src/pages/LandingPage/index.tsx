import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CarouselComponent from '../../components/LandingPage/CarouselComponent';
import SearchForm from '../../components/common/SearchForm';
import PopulateReview from '../../components/LandingPage/PopulateReviews';
import BestSeller from '../../components/LandingPage/BestSeller';
import { CheckNickname, SearchByNickname } from '../../API/USER_PUBLIC_API';

const LandingContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingPage: FunctionComponent = () => {
  return (
    <LandingContainer>
      <CarouselComponent />
      <SearchForm />
      <BestSeller />
      <PopulateReview />
    </LandingContainer>
  );
};

export default LandingPage;
