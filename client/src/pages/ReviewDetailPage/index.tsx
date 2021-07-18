import React, { FunctionComponent, useState, useEffect } from 'react';
import AddComment from '../../components/ReviewDetailComponent/AddComment';
import BookInfo from '../../components/ReviewDetailComponent/BookInfo';
import UserReview from '../../components/ReviewDetailComponent/UserReview';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CommentList from '../../components/ReviewDetailComponent/CommentList';
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

const MarginTop = styled.div`
  margin-top: 30px;
`;

interface IdType {
  id: string;
}

const Title = styled.h1`
  margin-top: 0;
`;

const ReviewDetailPage: FunctionComponent = () => {
  const [reviewDetail, setReviewDetail] = useState<any[]>([]);
  const [reviewComment, setReviewComment] = useState<any[]>([]);
  const [bookDetail, setBookDetail] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams<IdType>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(null);
        setReviewDetail([]);
        setLoading(true);
        const res = await axios.post('/api/review/detail', {
          reviewid: id,
        });
        setReviewDetail(res.data.review.review);
        setReviewComment(res.data.review.comment);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  // console.log(reviewDetail);
  console.log(reviewComment);

  // const fetchBookDetail = async (isbn: string) => {
  //   try {
  //     setError(null);
  //     setBookDetail([]);
  //     setLoading(true);
  //     const res = await axios.get(`/api/book/search?isbn=${isbn}`);
  //     setBookDetail(res.data);
  //     console.log(bookDetail);
  //   } catch (err) {
  //     // setError(err);
  //     console.log(err);
  //   }
  //   setLoading(false);
  // };

  // fetchBookDetail('9780780797086');

  // review 에서 isbn 값 받기
  // 이 isbn 값 이용해서
  // fetchBookData(isbn) 함수 만들기
  // 태그 속성 넣어두고 아마 userreview에서도 map 돌려 줘야할듯?

  // 코멘트는 그냥 잘 가져오면 될듯?!

  return (
    <ReviewDetailContainer>
      <BookInfoWrapper>
        {/* {reviewDetail &&
          reviewDetail.map((review) => (
            <BookInfo
              key={review.id}
              id={review.id}
              writer={review.isbn}
              year={review.isbn}
              genre={review.isbn}
              publisher={review.isbn}
              title={review.isbn}
              plot={review.isbn}
              bookCover={review.isbn}
            />
          ))} */}
      </BookInfoWrapper>
      <ReviewDetailWrapper container direction="column" alignContent="center">
        {reviewDetail &&
          reviewDetail.map((review) => (
            <UserReview
              key={review.id}
              id={review.id}
              score={review.score}
              summary={review.summary}
              nickname={review.user.nickname}
              updatedTime={review.updatedAt}
              like_count={review.like_count}
            />
          ))}
        <MarginTop />
        <Title>Comment</Title>
        {reviewComment &&
          reviewComment.map((comment) => (
            <CommentList
              key={comment.id}
              id={comment.id}
              text={comment.text}
              nickname={comment.user.nickname}
              updateAt={comment.updateAt}
              userImg={comment.user.profileImg}
            />
          ))}
        <MarginTop />
        <AddComment />
      </ReviewDetailWrapper>
    </ReviewDetailContainer>
  );
};

export default ReviewDetailPage;
