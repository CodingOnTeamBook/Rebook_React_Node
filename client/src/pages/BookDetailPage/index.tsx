import React, { FunctionComponent, useState, useEffect } from 'react';
import BookDetail from 'components/BookDetail/BookDetail';
import BookReview from 'components/BookDetail/BookReview';
import ReviewWriteBtn from 'components/BookDetail/ReviewWriteBtn';
import styled from 'styled-components';
import fetchData from 'globalFunction/fetchData';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

export interface review {
  commentCount: number;
  likeCount: number;
  summary: string;
  writer: string;
  writerProfileImg: string;
  createdAt: string;
  id: number;
}

interface initialState {
  data: any | null;
  isLoading?: boolean;
  isError: boolean | null;
}

const BookDetailPage: FunctionComponent = () => {
  const ISBN = decodeURI(location.pathname.split('/book/')[1]);

  const [bookInfoState, setBookInfoState] = useState<initialState>({
    data: null,
    isError: null,
  });

  const [bookTitle, setBookTitle] = useState('');

  const [reviewsState, setReviewsState] = useState<initialState>({
    data: null,
    isError: null,
  });

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `/api/book/search?title=${ISBN}`,
    }).then(({ data, isLoading, isError }) => {
      console.log(data.books.item[0]);
      setBookInfoState({
        ...bookInfoState,
        data: data.books.item[0],
        isError,
      });
      setBookTitle(data.books.item[0].title);
    });
    fetchData({
      method: 'POST',
      url: `/api/review/load/${ISBN}`,
      data: {
        orderby: 'created',
      },
    }).then(({ data, isLoading, isError }) => {
      setReviewsState({
        ...reviewsState,
        data: data.reviews,
        isError,
      });
    });
  }, []);

  if (bookInfoState.isError || reviewsState.isError) {
    return (
      <div>
        <h1>
          에러가 발생했어요😨 <br /> 잠시 후 다시 시도해주세요
        </h1>
      </div>
    );
  }

  return (
    <Container>
      <Helmet>
        <meta
          charSet="utf-8"
          name="Book Detail Page"
          content="Book Information, 책 정보"
        />
        <title>{bookTitle}</title>
      </Helmet>
      <BookDetail bookInfo={bookInfoState.data} />
      <h1>REVIEW</h1>
      <BookReview reviews={reviewsState.data} isbn={ISBN} />
      <ReviewWriteBtn isbn={ISBN} />
    </Container>
  );
};

export default BookDetailPage;
