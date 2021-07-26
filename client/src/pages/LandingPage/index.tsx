import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import CarouselComponent from '../../components/LandingPage/CarouselComponent';
import SearchForm from '../../components/common/SearchForm';
import PopulateReview from '../../components/LandingPage/PopulateReviews';
import BestSeller from '../../components/LandingPage/BestSeller';
import { isNullishCoalesce } from 'typescript';

const LandingContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export interface book {
  author: string;
  cover: string;
  description: string;
  isbn: string;
  link: string;
  pubDate: string;
  publisher: string;
  title: string;
}

const LandingPage: FunctionComponent = () => {
  const [reviews, setReviews] = useState<Array<review> | null>(null);
  const [bestSeller, setBestSeller] = useState<Array<book>>([]);
  const [isError, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get('/api/book/bestseller');
        const {
          data: { bestSeller },
        } = response;
        console.log(bestSeller);
        setBestSeller(bestSeller);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchBestSeller();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/review/home');
        const {
          data: { reviews },
        } = response;
        if (reviews.length) {
          setError(false);
          setReviews(reviews);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchReviews();
  }, []);

  return (
    <LandingContainer>
      <CarouselComponent />
      <SearchForm />
      {isError ? (
        <Alert severity="error">
          에러가 발생했습니다. 잠시 후 다시 시도해주세요.
        </Alert>
      ) : (
        <>
          <BestSeller bestSeller={bestSeller} />
          <PopulateReview reviews={reviews} />
        </>
      )}
    </LandingContainer>
  );
};

export default LandingPage;
