import React, { FunctionComponent } from 'react';
import BookDetail from 'components/common/BookDetail';
import BookReview from 'components/BookDetail/BookReview';
import ReviewWriteBtn from 'components/BookDetail/ReviewWriteBtn';

import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

//BookDetail
//여기에서 IBSN으로 bookINFO 불러와서 component에 넣어주기
//BookInfo가 null값일 때(로딩중, 혹은 초기값)는 예외 처리, error 값이 true일 때는 에러페이지로
//BookDetail에 필요한 값을 담은 객체로 전달

//BookReview
//여기에서 API fetch 해서 BookReview 넣어주기(초기값, 최신순으로 가져오기)
//bookreview 안에서 tab 눌렀을 때 endpoint 바꾸고 부분 로딩
//bookreview 페이지에는 초기 리뷰 목록 , isbn값을 props로 넘겨주기
//둘 중 하나라도 에러 나면 에러 페이지로 redirect 주기

// 여기 자체에서 하는 것
const BookDetailPage: FunctionComponent = () => {
  return (
    <Container>
      <BookDetail />
      <h1>REVIEW</h1>
      <BookReview />
      <ReviewWriteBtn />
    </Container>
  );
};

export default BookDetailPage;
