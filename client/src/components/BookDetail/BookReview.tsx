import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../style/componentStyled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import TransferDate from '../../globalFunction/TransferDate';
import { myProfileImg } from '../../globalFunction/myInfoDefaultValue';
import { Link } from 'react-router-dom';
import { review } from 'pages/BookDetailPage';
import fetchData from 'globalFunction/fetchData';

const Container = styled.main`
  margin: 50px 0;
  height: 80v;
  background-color: ${(props) => props.theme.palette.green};
`;

const TabContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Tab = styled.button`
  width: 50%;
  height: 3em;
  font-size: 20px;
  border: 0px;
  padding: 12px;
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.white};

  &.selected {
    background-color: ${(props) => props.theme.palette.green};
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  overflow: auto;
  padding: 20px;
  padding-top: 60px;
`;

const Review = styled.div`
  display: flex;
  width: 90%;
  padding: 20px;
  margin: 10px 0;
  justify-content: space-around;
  align-items: center;
  border: 4px solid ${(props) => props.theme.palette.white};
  border-radius: 18px;
  box-shadow: 0 12px 16px ${(props) => props.theme.palette.darkgreen};
  background-color: white;

  .review_contents {
    width: 70%;
  }

  .review_contents h3 {
    color: ${(props) => props.theme.palette.darkgreen};
  }

  .review_comments {
    text-align: right;
  }
`;

const LikedIcon = styled(FavoriteIcon)`
  color: red;
  margin: 0 4px;
  font-size: 18px;
`;

const NoResultMsg = styled.h3`
  margin: auto;
  color: ${(props) => props.theme.palette.white};
`;

interface Props {
  reviews: Array<review> | null;
  isbn: string;
}

interface initialState {
  data: Array<review> | null;
  isError: boolean | null;
}

const BookReview = ({ reviews, isbn }: Props) => {
  const [_reviews, setReviews] = useState<initialState>({
    data: null,
    isError: null,
  });

  const [tabs, setTabs] = useState([
    { name: '최신순', selected: true },
    { name: '인기순', selected: false },
  ]);

  const onClick = (index: number) => {
    switchTab(index);
    switch (index) {
      case 0:
        return fetchData({
          method: 'POST',
          url: `/api/review/load/${isbn}`,
          data: {
            orderby: 'created',
          },
        }).then(({ data, isError }) => {
          setReviews({
            ..._reviews,
            data: data.reviews,
            isError,
          });
        });
      case 1:
        return fetchData({
          method: 'POST',
          url: `/api/review/load/${isbn}`,
          data: {
            orderby: 'popularity',
          },
        }).then(({ data, isError }) => {
          setReviews({
            ..._reviews,
            data: data.reviews,
            isError,
          });
        });
      default:
        return;
    }
  };

  function switchTab(index: number) {
    const tmp = [...tabs];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setTabs(tmp);
  }

  if (_reviews.isError) {
    return (
      <div>
        에러가 발생했어요😨 <br /> 잠시 후 다시 시도해주세요
      </div>
    );
  }

  return (
    <Container>
      <TabContainer>
        {tabs.map(({ name, selected }, index) => (
          <Tab
            key={index}
            onClick={() => onClick(index)}
            className={selected ? 'selected' : ''}
          >
            {name}
          </Tab>
        ))}
      </TabContainer>
      <ReviewContainer>
        {!reviews?.length && (
          <NoResultMsg>
            아직 작성된 리뷰가 없어요😢 <br />이 책의 첫 리뷰어가 되어보세요!
          </NoResultMsg>
        )}
        {tabs[0].selected ? (
          <>
            {reviews?.map(
              (
                { likeCount, summary, writer, writerProfileImg, createdAt, id },
                index: number
              ) => (
                <Review key={index}>
                  <ProfileImg
                    src={
                      !writerProfileImg
                        ? myProfileImg('defaultImg')
                        : writerProfileImg
                    }
                  />
                  <div className="review_contents">
                    <h3>
                      {TransferDate(createdAt)} {'|'} {writer} 님이 올리신
                      리뷰입니다
                    </h3>
                    <h4>
                      {summary}
                      <Link to={`/review/${id}`}>
                        <span>...더보기</span>
                      </Link>
                    </h4>
                    <div className="review_comments">
                      <LikedIcon />
                      {likeCount}
                    </div>
                  </div>
                </Review>
              )
            )}
          </>
        ) : (
          <>
            {_reviews.data?.map(
              (
                { likeCount, summary, writer, writerProfileImg, createdAt, id },
                index: number
              ) => (
                <Review key={index}>
                  <ProfileImg
                    src={
                      !writerProfileImg
                        ? myProfileImg('defaultImg')
                        : writerProfileImg
                    }
                  />
                  <div className="review_contents">
                    <h3>
                      {TransferDate(createdAt)} {'|'} {writer} 님이 올리신
                      리뷰입니다
                    </h3>
                    <h4>
                      {summary}
                      <Link to={`/review/${id}`}>
                        <span>...더보기</span>
                      </Link>
                    </h4>
                    <div className="review_comments">
                      <LikedIcon />
                      {likeCount}
                    </div>
                  </div>
                </Review>
              )
            )}
          </>
        )}
      </ReviewContainer>
    </Container>
  );
};

export default BookReview;
