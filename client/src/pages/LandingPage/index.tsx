import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CarouselComponent from '../../components/CarouselComponent';
import SearchForm from '../../components/SearchForm';

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
        <div>추천 책 컴포넌트</div>
        <div>인기 리뷰 컴포넌트</div>
      </LandingContainer>
    </>
  );
};

export default LandingPage;
