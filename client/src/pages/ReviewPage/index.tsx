import React, { FunctionComponent, useEffect, useState } from 'react';
import ReviewItem from '../../components/ReviewComponent/ReviewItem';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from 'layout/GridItem';
import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScroll from 'react-infinite-scroller';

const ReviewContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const SelectSortContainer = styled.div`
  text-align: right;
`;

export const SortButton = styled(Button)`
  margin-bottom: 30px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
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
  { name: 'created', text: '최신순' },
  { name: 'popularity', text: '인기순' },
];

// endpoint에 따라서 reviews가 달라지기 때문에 같은 배열에서 관리
// select 한 상태에 따라서 api parmas에 변화
// 에러는 던지고, loading 중은 if(loading) return 메세지
// select 값에 따라 endpoint 고정 후에 페이지 네이션 진행

const ReviewPage: FunctionComponent = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isSelected, setIsSelected] = useState('created');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(null);
        setReviews([]);
        setLoading(true);
        const res = await axios.get(`api/review/${isSelected}?page=${page}`);
        setReviews(res.data.reviews);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, [isSelected]);

  const loadMorePost = async (sort: any) => {
    await axios.get(`api/review/${sort}?page=${page}`).then((res) => {
      setReviews([...reviews, ...res.data.reviews]);
      setPage(page + 1);
    });
  };

  const checkFunc = (index: any) => isSelected.includes(index);

  return (
    <ReviewContainer>
      <SelectSortContainer>
        {sorts.map((sort, index) => (
          <SortButton
            size="large"
            key={index}
            onClick={() => {
              setIsSelected(sort.name);
            }}
            className={checkFunc(sort.name) ? 'selected' : ''}
          >
            {sort.text}
          </SortButton>
        ))}
      </SelectSortContainer>
      {error || loading ? (
        error ? (
          <Message>에러가 발생했습니다 😭</Message>
        ) : (
          <Message> 로딩 중입니다 📚</Message>
        )
      ) : (
        <>
          <GridLayout>
            <>
              {reviews &&
                reviews.map((review, index) => (
                  <GridItem key={index}>
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
        </>
      )}
    </ReviewContainer>
  );
};

export default ReviewPage;
