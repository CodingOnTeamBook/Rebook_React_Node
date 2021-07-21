import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import CarouselComponent from '../../components/LandingPage/CarouselComponent';
import SearchForm from '../../components/common/SearchForm';
import PopulateReview from '../../components/LandingPage/PopulateReviews';
import BestSeller from '../../components/LandingPage/BestSeller';

const LandingContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//bestseller랑 populateReview도 여기서 fetch해서 props로 넘겨주는게 낫지만
//지금은 딱히 문제 될 것 없어 보여서 다른 급한 것 부터 하기

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
