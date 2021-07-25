import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import GridLayout from 'layout/Grid';
import GridItem from 'layout/GridMediumItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useCheck from '../../hooks/useCheck';
import SmallReview from './SmallReview';
import { getPrivateReview, getPublicReview } from 'API/USER_PRIVATE_API';
import { useInView } from 'react-intersection-observer';

const Container = styled.div`
  width: 95%;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const GreenCheckbox = styled(Checkbox)`
  color: ${(props) => props.theme.palette.green};
  &:checked {
    color: ${(props) => props.theme.palette.darkgreen};
  }
  &:hover {
    color: ${(props) => props.theme.palette.green};
  }
`;

const CheckBoxArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ScrollMessage = styled.span`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
`;

interface review {
  bookCover: string;
  bookTitle: string;
  id: number;
  like_count: number;
  score: number;
  summary: string;
  tags: Array<string>;
  writer: string;
}

const MyReview = () => {
  const [reviews, setReviews] = useState<Array<review> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [ref, inView] = useInView();
  const { value, onChange } = useCheck({
    name: '비공개',
    initialValue: false,
  });

  const Reset = () => {
    setIsMore((prevState) => true);
    setReviews((prevState) => null);
    setPage((prevState) => 1);
  };

  useEffect(() => {
    Reset();
  }, [value]);

  const fetchPrivateReview = () => {
    getPrivateReview(page).then((response) => {
      if (!response.success) {
        alert('내 정보를 가져오지 못했습니다.');
      }
      setReviews((prev) => {
        if (prev != null) {
          return [...prev, ...response.result];
        } else {
          return [...response.result];
        }
      });
      setLoading(false);
    });
  };

  const fetchPubliceReview = () => {
    getPublicReview(page).then((response) => {
      if (!response.success) {
        alert('내 정보를 가져오지 못했습니다.');
      }
      if (response.result.length == 0) {
        setIsMore(false);
      }
      setReviews((prev) => {
        if (prev != null) {
          return [...prev, ...response.result];
        } else {
          return [...response.result];
        }
      });
      setLoading(false);
    });
  };

  const fetchReviews = () => {
    if (isMore) {
      setLoading(true);
      if (value) {
        fetchPrivateReview();
      } else {
        fetchPubliceReview();
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <Container>
      <CheckBoxArea>
        <FormControlLabel
          control={
            <GreenCheckbox
              color="default"
              checked={value}
              onChange={onChange}
              name="비공개"
            />
          }
          label="비공개"
        />
      </CheckBoxArea>
      <GridLayout>
        {reviews?.map((review: review, index: number) => (
          <GridItem key={index}>
            <SmallReview like={false} review={review} />
          </GridItem>
        ))}
        <div ref={ref}></div>
      </GridLayout>
    </Container>
  );
};

export default MyReview;
