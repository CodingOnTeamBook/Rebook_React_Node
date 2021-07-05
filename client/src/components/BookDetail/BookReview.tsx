import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../style/componentStyled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SmsIcon from '@material-ui/icons/Sms';

const Container = styled.main`
  margin: 50px 0;
  height: 80vh;
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
  background-color: ${(props) => props.theme.palette.lightgreen};

  &.selected {
    background-color: ${(props) => props.theme.palette.green};
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88%;
  overflow: auto;
  padding: 18px;
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
  background-color: ${(props) => props.theme.palette.white};

  .review_contents {
    width: 70%;
  }

  .review_comments {
    text-align: right;
  }
`;

const LikedIcon = styled(FavoriteIcon)`
  color: red;
  margin: 0 4px;
`;

const CommentsIcon = styled(SmsIcon)`
  margin: 0 4px;
`;

const BookReview: FunctionComponent = () => {
  const [tabs, setTabs] = useState([
    { name: '최신순', selected: true },
    { name: '인기순', selected: false },
  ]);

  // 📍 날짜순, 좋아요 순으로 정렬해보기위한 Test array data
  // 📍 실제 받아오는 데이터와 다름
  const REVIEW_TEST = [
    {
      user: {
        writer: '차유진',
        userImg:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      review: {
        contents:
          '진짜 공부하기 싫어서 죽을 것만 같았는데 이 책을 읽고나니 정말 공부하기 싫어졌어요!',
        date: 20210701,
        liked: 111,
        star: 3,
        comments: 3,
      },
    },
    {
      user: {
        writer: '최경득',
        userImg:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      review: {
        contents:
          '내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2내용2',
        date: 20210702,
        liked: 2,
        star: 4,
        comments: 33,
      },
    },
    {
      user: {
        writer: '풀떼기',
        userImg:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      review: {
        contents:
          '내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3내용3',
        date: 20210703,
        liked: 11,
        star: 5,
        comments: 100,
      },
    },
  ];

  const onClick = (index: number) => {
    const tmp = [...tabs];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setTabs(tmp);
  };

  const latestOrder = () =>
    [...REVIEW_TEST].sort((a, b) => b.review.date - a.review.date);

  const popularityOrder = () =>
    [...REVIEW_TEST].sort((a, b) => b.review.liked - a.review.liked);

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
        {tabs[0].selected ? (
          <>
            {latestOrder().map((review, index) => (
              <Review key={index}>
                <ProfileImg src={review.user.userImg} />
                <div className="review_contents">
                  <h3>
                    {review.review.date} 에 {review.user.writer} 님이 올리신
                    글입니다.
                  </h3>
                  <h4>{review.review.contents}</h4>
                  <div className="review_comments">
                    <LikedIcon />
                    {review.review.liked}
                    <CommentsIcon />
                    {review.review.comments}
                  </div>
                </div>
              </Review>
            ))}
          </>
        ) : (
          <>
            {popularityOrder().map((review, index) => (
              <Review key={index}>
                <ProfileImg src={review.user.userImg} />
                <div className="review_contents">
                  <h3>
                    {review.review.date} 에 {review.user.writer} 님이 올리신
                    글입니다.
                  </h3>
                  <h4>{review.review.contents}</h4>
                  <div className="review_comments">
                    <LikedIcon />
                    {review.review.liked}
                    <CommentsIcon />
                    {review.review.comments}
                  </div>
                </div>
              </Review>
            ))}
          </>
        )}
      </ReviewContainer>
    </Container>
  );
};

export default BookReview;
