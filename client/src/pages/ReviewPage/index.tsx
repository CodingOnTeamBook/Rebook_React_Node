import React, { FunctionComponent, useEffect, useState } from 'react';
import ReviewMain from '../../components/ReviewComponent/ReviewMain';
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
  z-index: 0;
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

const ReviewPage: FunctionComponent = () => {
  const [createdReviews, setCreatedReviews] = useState<any[]>([]);
  const [populatedReviews, setPopulatedReviews] = useState<any[]>([]);
  const [sorts, setSorts] = useState([
    { name: '최신순', selected: true },
    { name: '인기순', selected: false },
  ]);

  useEffect(() => {
    axios
      .all([axios.get('api/review/created'), axios.get('api/review/populated')])
      .then(
        axios.spread((res1, res2) => {
          setCreatedReviews(res1.data.review);
          setPopulatedReviews(res2.data.review);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const onClick = (index: number) => {
    const tmp = [...sorts];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setSorts(tmp);
  };

  return (
    <ReviewContainer>
      <SelectSortContainer>
        {sorts.map(({ name, selected }, index) => (
          <SortButton
            size="large"
            key={index}
            onClick={() => onClick(index)}
            className={selected ? 'selected' : ''}
          >
            {name}
          </SortButton>
        ))}
      </SelectSortContainer>
      <GridLayout>
        {sorts[0].selected ? (
          <>
            {createdReviews.map((review, index) => (
              <ReviewMain
                key={index}
                id={index}
                cover={review.cover}
                title={review.title}
                summary={review.summary}
                score={review.score}
              />
            ))}
          </>
        ) : (
          <>
            {populatedReviews &&
              populatedReviews.map((review, index) => (
                <ReviewMain
                  key={index}
                  id={index}
                  cover={review.cover}
                  title={review.title}
                  summary={review.summary}
                  score={review.score}
                />
              ))}
          </>
        )}
      </GridLayout>
    </ReviewContainer>
  );
};

export default ReviewPage;
