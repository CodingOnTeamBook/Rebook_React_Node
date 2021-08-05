import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import CarouselComponent from '../../components/LandingPage/CarouselComponent';
import SearchForm from '../../components/common/SearchForm';
import PopulateReview from '../../components/LandingPage/PopulateReviews';
import BestSeller from '../../components/LandingPage/BestSeller';
import fetchData from 'globalFunction/fetchData';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';

const LandingContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 40vh;
`;

interface IProps {
  data: any | null;
  isLoading: boolean;
  isError: boolean | null;
}

const initialState: IProps = {
  data: null,
  isLoading: true,
  isError: null,
};

const LandingPage: FunctionComponent = () => {
  const [bestSellerState, setBestSellerState] = useState<IProps>({
    ...initialState,
  });
  const [reviewsState, setReviewsState] = useState<IProps>({
    ...initialState,
  });

  useEffect(() => {
    fetchData({ method: 'GET', url: '/api/book/bestseller' }).then(
      ({ data, isError, isLoading }) => {
        setBestSellerState({
          ...bestSellerState,
          data: data.bestSeller,
          isError,
          isLoading,
        });
      }
    );
    fetchData({ method: 'GET', url: '/api/review/home' }).then(
      ({ data, isError, isLoading }) => {
        setReviewsState({
          ...reviewsState,
          data: data.reviews,
          isError,
          isLoading,
        });
      }
    );
  }, []);

  if (bestSellerState.isLoading) {
    return (
      <LandingContainer>
        <CarouselComponent />
        <SearchForm />
        <Loading>
          <CircularProgress />
        </Loading>
        <PopulateReview reviews={reviewsState.data} />
      </LandingContainer>
    );
  }

  if (reviewsState.isLoading) {
    return (
      <LandingContainer>
        <CarouselComponent />
        <SearchForm />
        <BestSeller bestSeller={bestSellerState.data} />
        <Loading>
          <CircularProgress />
        </Loading>
      </LandingContainer>
    );
  }

  return (
    <LandingContainer>
      <CarouselComponent />
      <SearchForm />
      {bestSellerState.isError || reviewsState.isError ? (
        <Alert severity="error">
          에러가 발생했습니다. 잠시 후 다시 시도해주세요.
        </Alert>
      ) : (
        <>
          <BestSeller bestSeller={bestSellerState.data} />
          <PopulateReview reviews={reviewsState.data} />
        </>
      )}
    </LandingContainer>
  );
};

export default LandingPage;
