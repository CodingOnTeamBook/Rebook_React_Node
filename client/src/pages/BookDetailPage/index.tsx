import React, { FunctionComponent, useState, useEffect } from 'react';
import BookDetail from 'components/common/BookDetail';
import BookReview from 'components/BookDetail/BookReview';
import ReviewWriteBtn from 'components/BookDetail/ReviewWriteBtn';
import styled from 'styled-components';
import axios from 'axios';
import BookInfo from 'components/common/BookInfo';

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

// 이건 일단 여기에...
export interface review {
  commentCount: number;
  likeCount: number;
  summary: string;
  writer: string;
  writerProfileImg: string;
  createdAt: string;
  id: number;
}

const BookDetailPage: FunctionComponent = () => {
  // 여기서 isbn이 isbn13이랑 혼용되는게 문제
  // 이제 isbn13으로 받음
  const isbn = decodeURI(location.pathname.split('/book/')[1]);

  const [bookInfo, setBookInfo] = useState();
  const [bookError, setBookError] = useState(false);

  const [reviews, setReviews] = useState<Array<review>>();
  const [isEmptyReviews, setIsEmptyReviews] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState(false);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`/api/book/search?title=${isbn}`);
        setBookInfo(response.data.books.item[0]);
      } catch (err) {
        setBookError(true);
      }
    };
    fetchBookInfo();
  }, []);

  useEffect(() => {
    const fetchReviews = async (orderby: string) => {
      try {
        const response = await axios.post(`/api/review/load/${isbn}`, {
          orderby: `${orderby}`,
        });
        if (response.data.reviews.length) {
          setReviews(response.data.reviews);
          setIsEmptyReviews(false);
          setReviewError(false);
        } else {
          setIsEmptyReviews(true);
          setReviewError(false);
        }
      } catch (error) {
        console.log(error.response.data);
        setReviewError(true);
      }
    };
    fetchReviews('created');
  }, []);

  if (bookError || reviewError) {
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
      <BookDetail bookInfo={bookInfo} />
      <h1>REVIEW</h1>
      <BookReview
        reviews={reviews}
        isEmptyReviews={isEmptyReviews}
        isbn={isbn}
      />
      <ReviewWriteBtn isbn={isbn} />
    </Container>
  );
};

export default BookDetailPage;
