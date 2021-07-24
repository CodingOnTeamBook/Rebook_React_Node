import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { LineGreenBtn } from '../../style/componentStyled';
import MenuIconBtn from './MenuIconBtn';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import useCheck from '../../hooks/useCheck';
import review from '../LandingPage/PopulateReviews';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  height: 200px;
  padding: 0.4rem;
  display: flex;
  box-shadow: 6px 6px 8px rgba(114, 114, 114, 0.15);
  transition: all 0.2s linear;
`;

const ImgArea = styled.div`
  width: 150px;
`;

const TextArea = styled.div`
  flex: 1;
  padding: 1rem;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 120px;
  height: 160px;
  position: relative;
  top: -20px;
  right: -15px;
  background-color: blue;
  box-shadow: 4px -4px 8px rgba(0, 0, 0, 0.34);
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.2s linear;
  }
  img:hover {
    transform: scale(1.1);
  }
`;

const BookInfo = styled.div`
  a {
    font-size: 15px;
    color: ${(props) => props.theme.palette.black};
    margin: 0;
    font-weight: bold;
    line-height: 1;
  }
  span {
    font-size: 8px;
    color: ${(props) => props.theme.palette.darkgray};
    margin-left: 0.5rem;
    font-weight: 300;
    line-height: 1;
  }
  margin: 0.2rem;
`;

const TextInfo = styled.div`
  font-size: 11px;
  overflow: hidden;
  margin: 0.2rem;
  min-height: 30%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const MoreInfoBtn = styled(LineGreenBtn)`
  height: 30px;
  margin-top: 0.6rem;
`;

const LikeCheckBtn = styled(Checkbox)`
  position: absolute;
  top: 0;
  right: 0;
`;

interface review {
  bookCover: string;
  bookTitle: string;
  id: number;
  like_count: number;
  score: number;
  summary: string;
  tags: Array<string> | null;
  writer: string;
}

interface IProps {
  like: boolean;
  review?: review;
}

const SmallReview = ({ like, review }: IProps) => {
  const history = useHistory();
  const [rating, setRating] = useState<number | undefined>(review?.score);
  const { value, onChange, CheckedValue } = useCheck({
    name: 'MyLikeReview',
    initialValue: true,
  });

  const MAX_TITLE_LENGTH = 14;
  const MAX_SUMMARY_LENGTH = 30;

  return (
    <Container>
      <ImgArea>
        <ImgContainer>
          <img alt="bookimg" src={review?.bookCover} />
        </ImgContainer>
      </ImgArea>
      <TextArea>
        {like ? (
          <LikeCheckBtn
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={value}
            onChange={onChange}
            name="MyLikeReview"
          />
        ) : (
          <MenuIconBtn />
        )}
        <BookInfo>
          <a href="">{review?.bookTitle.slice(0, MAX_TITLE_LENGTH)}</a>
        </BookInfo>
        <Rating name="read-only" value={rating} readOnly />
        <TextInfo>
          {like ? (
            <span>{review?.writer}님이 쓰신 리뷰입니다</span>
          ) : (
            review?.summary.slice(0, MAX_SUMMARY_LENGTH)
          )}
        </TextInfo>
        <MoreInfoBtn onClick={() => history.push(`/review/${review?.id}`)}>
          더 보기
        </MoreInfoBtn>
      </TextArea>
    </Container>
  );
};

export default SmallReview;
