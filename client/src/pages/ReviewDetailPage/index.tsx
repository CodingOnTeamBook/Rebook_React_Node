import React, { FunctionComponent, useState, useEffect } from 'react';
import BookInfo from '../../components/ReviewDetailComponent/BookInfo';
import UserReview from '../../components/ReviewDetailComponent/UserReview';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router';
import axios from 'axios';

const ReviewDetailContainer = styled(Grid)`
  border-radius: 20px;
  background-color: #f6f6f6;
  margin-top: 50px;
`;

const BookInfoWrapper = styled(Grid)`
  width: 100%;
  border-radius: 20px;
  padding: 5% 5% 0 5%;
`;

const ReviewDetailWrapper = styled(Grid)`
  width: 100%;
  padding: 5%;
  margin-bottom: 50px;
`;

const Message = styled.span`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
`;

interface IdType {
  id: string;
}

//에러 헨들링 => 에러 페이지로 redirect
//로딩중 if(loading) return <div> 로딩중.. <div>
//값이 없을 때 => alert띄우거나, <div>값이 없습니다. </div>
//API 폴더에 fetchReview만들고, fetchReview.then().catch() 형식으로 작성
//에러, 로딩 표시에 더 용이
//구조 자체는 layout으로 빼는 것이 best지만 딱히 지장은 없으므로 패스

const ReviewDetailPage: FunctionComponent = () => {
  const [bookDetail, setBookDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userInfo, setUserInfo] = useState({
    nickname: '',
    profileImg: '',
  });
  const [reviewDetail, setReviewDetail] = useState({
    id: 0,
    summary: '',
    score: 0,
    like_count: 0,
    tags: [],
    createdAt: '',
    text: '',
    isbn: '',
    content: '',
  });

  const { id } = useParams<IdType>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.post('/api/review/detail', {
          reviewid: id,
        });
        setUserInfo(res.data.review.review.user);
        fetchBookDetail(res.data.review.review.isbn);
        setReviewDetail(res.data.review.review);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const fetchBookDetail = async (isbn: any) => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.get(`/api/book/search?title=${isbn}`);
      setBookDetail(res.data.books.item[0]);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {error || loading ? (
        error ? (
          <Message>에러가 발생했습니다 😭</Message>
        ) : (
          // 로딩 중입니다 📚
          <Message></Message>
        )
      ) : (
        <ReviewDetailContainer>
          <BookInfoWrapper>
            <BookInfo bookInfo={bookDetail} isbn={reviewDetail.isbn} />
          </BookInfoWrapper>
          <ReviewDetailWrapper
            container
            direction="column"
            alignContent="center"
          >
            <UserReview
              key={reviewDetail.id}
              id={reviewDetail.id}
              score={reviewDetail.score}
              nickname={userInfo.nickname}
              profileImg={userInfo.profileImg}
              createdAt={reviewDetail.createdAt}
              like_count={reviewDetail.like_count}
              tags={reviewDetail.tags}
              content={reviewDetail.content}
            />
          </ReviewDetailWrapper>
        </ReviewDetailContainer>
      )}
    </>
  );
};

export default ReviewDetailPage;
