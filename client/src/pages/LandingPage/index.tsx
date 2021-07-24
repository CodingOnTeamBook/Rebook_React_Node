import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const LandingPage: FunctionComponent = () => {
  const [reviews, setReviews] = useState<Array<review> | null>(null);
  const [isError, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/review/home');
        const {
          data: { reviews },
        } = response;
        console.log(reviews);
        if (reviews.length) {
          setError(false);
          setReviews(reviews);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchReviews();
  }, []);

  return (
    <LandingContainer>
      <CarouselComponent />
      <SearchForm />
      <BestSeller />
      {isError ? (
        <h2>에러가 발생했어요😢 잠시후 다시 시도해주세요</h2>
      ) : (
        <PopulateReview reviews={reviews} />
      )}
    </LandingContainer>
  );
};

export default LandingPage;
