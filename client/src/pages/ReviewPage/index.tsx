import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import ReviewItem from '../../components/ReviewComponent/ReviewItem';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from 'layout/GridItem';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const ReviewContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const SelectSortContainer = styled.div`
  text-align: right;
`;

export const SortButton = styled(Button)`
  margin-bottom: 20px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &.selected {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

const Message = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
`;

const sorts = [
  { type: 0, name: 'created', text: '최신순' },
  { type: 1, name: 'popularity', text: '인기순' },
];

// endpoint에 따라서 reviews가 달라지기 때문에 같은 배열에서 관리
// select 한 상태에 따라서 api parmas에 변화
// 에러는 던지고, loading 중은 if(loading) return 메세지
// select 값에 따라 endpoint 고정 후에 페이지 네이션 진행

const ReviewPage: FunctionComponent = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [isHasMore, setIsHasMore] = useState(true);
  const [isSelected, setIsSelected] = useState('created');
  const page = useRef(1);

  useEffect(() => {
    setIsHasMore(true);
    fetchReviews();
  }, [isSelected]);

  const fetchReviews = async () => {
    try {
      setError(null);
      await axios
        .get(`api/review/${isSelected}?page=${page.current}`)
        .then((res) => {
          setReviews([...reviews, ...res.data.reviews]);
          if (res.data.reviews.length === 0) {
            setIsHasMore(false);
          } else {
            setIsHasMore(true);
          }
        });
    } catch (err) {
      setError(err);
    }
    page.current += 1;
  };

  const onChangeSort = (e: any) => {
    setIsSelected(e);
    if (isSelected == e) {
      setReviews([...reviews]);
    } else {
      setReviews([]);
      page.current = 1;
    }
  };

  const checkFunc = (name: any) => isSelected.includes(name);

  return (
    <ReviewContainer>
      <SelectSortContainer>
        {sorts.map((sort) => (
          <SortButton
            size="large"
            key={sort.type}
            onClick={() => onChangeSort(sort.name)}
            className={checkFunc(sort.name) ? 'selected' : ''}
          >
            {sort.text}
          </SortButton>
        ))}
      </SelectSortContainer>
      {error ? (
        <Message>에러가 발생했습니다 😭</Message>
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden', padding: '20px' }}
          dataLength={reviews.length}
          next={fetchReviews}
          hasMore={isHasMore}
          loader={<Message></Message>}
        >
          <GridLayout>
            <>
              {reviews.map((review) => (
                <GridItem key={review.id}>
                  <ReviewItem
                    id={review.id}
                    cover={review.bookCover}
                    title={review.bookTitle}
                    summary={review.summary}
                    score={review.score}
                    writer={review.writer}
                  />
                </GridItem>
              ))}
            </>
          </GridLayout>
        </InfiniteScroll>
      )}
    </ReviewContainer>
  );
};

export default ReviewPage;
