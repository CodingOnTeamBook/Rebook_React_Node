import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../style/componentStyled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SmsIcon from '@material-ui/icons/Sms';
import axios from 'axios';
import TransferDate from '../../globalFunction/TransferDate';
import { myProfileImg } from '../../globalFunction/myInfoDefaultValue';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { review } from 'pages/BookDetailPage';

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
  font-size: 18px;
`;

const CommentsIcon = styled(SmsIcon)`
  margin: 0 4px;
  font-size: 18px;
`;

const NoResultMsg = styled.h3`
  margin: auto;
  color: ${(props) => props.theme.palette.white};
`;

//bookreview 넘겨받은 초기 배열로 review 뿌려주서(캐싱 개념으로 가지고 있기)
//state를 따로 관리해서 인기순 누르면 fetchAPI 호출 후 리로딩
//다음 페이지로 넘어갈 때는 Link to={`/review/${id}`}로 작성 ( Link가 React에서 최적화 되어있기도 하고 가독성이 좋아서.)
//빈 값일 때는 따로 return 하기 안에서 {isEmpty && }이런식으로 작성하지 말구

interface Props {
  reviews: Array<review> | undefined;
  isEmptyReviews: boolean;
  isbn: string;
}

const BookReview = ({ reviews, isEmptyReviews, isbn }: Props) => {
  const [_reviews, setReviews] = useState(reviews);
  const [error, setError] = useState<null | boolean>(null);

  const [tabs, setTabs] = useState([
    { name: '최신순', selected: true },
    { name: '인기순', selected: false },
  ]);

  const fetchReviews = async (orderby: string) => {
    try {
      const response = await axios.post(`/api/review/load/${isbn}`, {
        orderby: `${orderby}`,
      });
      setReviews(response.data.reviews);
    } catch (err) {
      setError(true);
    }
  };

  const onClick = (index: number) => {
    switchTab(index);
    switch (index) {
      case 0:
        return fetchReviews('created');
      case 1:
        return fetchReviews('popularity');
      default:
        return;
    }
  };

  // 탭을 쓰는 다른 컴포넌트를 위해 나중에 글로벌로 뺄 수도 있음
  function switchTab(index: number) {
    const tmp = [...tabs];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setTabs(tmp);
  }

  if (error) {
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
        {isEmptyReviews && (
          <NoResultMsg>
            아직 작성된 리뷰가 없어요😢 <br /> 첫 리뷰를 작성해주세요!
          </NoResultMsg>
        )}
        {tabs[0].selected ? (
          <>
            {reviews?.map(
              (
                {
                  commentCount,
                  likeCount,
                  summary,
                  writer,
                  writerProfileImg,
                  createdAt,
                  id,
                },
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
                      {TransferDate(createdAt)} {writer} 님이 올리신 리뷰입니다.
                    </h3>
                    <h4>
                      {summary}
                      <Link to={`/review/${id}`}>...더보기</Link>
                    </h4>
                    <div className="review_comments">
                      <LikedIcon />
                      {likeCount} <CommentsIcon />
                      {commentCount}
                    </div>
                  </div>
                </Review>
              )
            )}
          </>
        ) : (
          <>
            {_reviews?.map(
              (
                {
                  commentCount,
                  likeCount,
                  summary,
                  writer,
                  writerProfileImg,
                  createdAt,
                  id,
                },
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
                      {TransferDate(createdAt)} {writer} 님이 올리신 리뷰입니다.
                    </h3>
                    <h4>
                      {summary}
                      <Link to={`/review/${id}`}>...더보기</Link>
                    </h4>
                    <div className="review_comments">
                      <LikedIcon />
                      {likeCount} <CommentsIcon />
                      {commentCount}
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
