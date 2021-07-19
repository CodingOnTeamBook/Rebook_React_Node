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

const Title = styled.h1`
  margin-top: 0;
`;

const Message = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 30px;
`;

const CommentZero = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 20px;
  margin-bottom: 20px;
`;

interface IdType {
  id: string;
}

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
        setReviewComment([]);
        setBookDetail([]);
        setLoading(true);
        const res = await axios.post('/api/review/detail', {
          reviewid: id,
        });
        setReviewDetail(res.data.review.review);
        fetchBookDetail(res.data.review.review[0].isbn);
        setReviewComment(res.data.review.comment);
        console.log(reviewComment.length);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const fetchBookDetail = async (isbn: any) => {
    try {
      setError(null);
      setBookDetail([]);
      setLoading(true);
      const res = await axios.get(`/api/book/search?title=${isbn}`);
      setBookDetail(res.data.books.item);
      console.log(res.data.books.item);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // 코멘트는 그냥 잘 가져오면 될듯?!

  return (
    <ReviewDetailContainer>
      {error || loading ? (
        error ? (
          <Message>에러가 발생했습니다 😭</Message>
        ) : (
          <Message> 로딩 중입니다 📚</Message>
        )
      ) : (
        <>
          <BookInfoWrapper>
            {bookDetail &&
              bookDetail.map((review) => (
                <BookInfo
                  key={review.isbn}
                  writer={review.author}
                  year={review.pubDate}
                  publisher={review.publisher}
                  title={review.title}
                  plot={review.description}
                  bookCover={review.cover}
                />
              ))}
          </BookInfoWrapper>
          <ReviewDetailWrapper
            container
            direction="column"
            alignContent="center"
          >
            {reviewDetail &&
              reviewDetail.map((review) => (
                <UserReview
                  key={review.id}
                  id={review.id}
                  score={review.score}
                  summary={review.summary}
                  nickname={review.user.nickname}
                  profileImg={review.user.profileImg}
                  updatedTime={review.updatedAt}
                  like_count={review.like_count}
                />
              ))}
            <MarginTop />
            <Title>Comment</Title>
            {reviewComment.length === 0 ? (
              <CommentZero> 작성된 댓글이 없습니다. </CommentZero>
            ) : (
              reviewComment &&
              reviewComment.map((comment) => (
                <CommentList
                  key={comment.id}
                  id={comment.id}
                  text={comment.text}
                  nickname={comment.user.nickname}
                  userImg={comment.user.profileImg}
                  updateAt={comment.updateAt}
                />
              ))
            )}
            <MarginTop />
            <AddComment />
          </ReviewDetailWrapper>
        </>
      )}
    </ReviewDetailContainer>
  );
};

export default ReviewDetailPage;
