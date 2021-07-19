import React, { FunctionComponent, useEffect, useState } from 'react';
import ReviewItem from '../../components/ReviewComponent/ReviewItem';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import axios from 'axios';

const ReviewContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const SelectSortContainer = styled.div`
  text-align: right;
`;

const SortButton = styled(Button)`
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
  font-size: 30px;
`;

const ReviewPage: FunctionComponent = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sorts, setSorts] = useState([
    { name: 'created', text: '최신순', selected: true },
    { name: 'popularity', text: '인기순', selected: false },
  ]);

  useEffect(() => {
    fetchReviews('created');
  }, []);

  const fetchReviews = async (sort: string) => {
    try {
      setError(null);
      setReviews([]);
      setLoading(true);
      const res = await axios.get(`api/review/${sort}`);
      setReviews(res.data.reviews);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const onSortChange = (index: number) => {
    const tmp = [...sorts];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setSorts(tmp);
  };

  return (
    <ReviewContainer>
      <SelectSortContainer>
        {sorts.map(({ text, name, selected }, index) => (
          <SortButton
            size="large"
            key={index}
            onClick={() => {
              onSortChange(index);
              fetchReviews(name);
            }}
            className={selected ? 'selected' : ''}
          >
            {text}
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
        <GridLayout>
          {sorts[0].selected ? (
            <>
              {reviews &&
                reviews.map((review, index) => (
                  <ReviewItem
                    key={index}
                    id={review.id}
                    cover={review.bookCover}
                    title={review.bookTitle}
                    summary={review.summary}
                    score={review.score}
                    writer={review.writer}
                  />
                ))}
            </>
          ) : (
            <>
              {reviews &&
                reviews.map((review, index) => (
                  <ReviewItem
                    key={index}
                    id={review.id}
                    cover={review.bookCover}
                    title={review.bookTitle}
                    summary={review.summary}
                    score={review.score}
                    writer={review.writer}
                  />
                ))}
            </>
          )}
        </GridLayout>
      )}
    </ReviewContainer>
  );
};

export default ReviewPage;
