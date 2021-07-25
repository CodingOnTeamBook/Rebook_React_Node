import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import GridLayout from 'layout/Grid';
import GridItem from 'layout/GridMediumItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useCheck from '../../hooks/useCheck';
import SmallReview from './SmallReview';
import { getPrivateReview, getPublicReview } from 'API/USER_PRIVATE_API';

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
  const [reviews, setReviews] = useState<any>(null);
  const page = useRef<number>(1);
  const { value, onChange } = useCheck({
    name: '비공개',
    initialValue: false,
  });

  const Reset = () => {
    setReviews(null);
    page.current = 1;
    fetchReviews();
  };

  useEffect(() => {
    Reset();
  }, [value]);

  const fetchPrivateReview = () => {
    getPrivateReview(page.current).then((response) => {
      if (!response.success) {
        alert('내 정보를 가져오지 못했습니다.');
      }
      setReviews([...response.result]);
    });
  };

  const fetchPubliceReview = () => {
    getPublicReview(page.current).then((response) => {
      if (!response.success) {
        alert('내 정보를 가져오지 못했습니다.');
      }
      setReviews([...response.result]);
    });
  };

  const fetchReviews = () => {
    if (value) {
      fetchPrivateReview();
    } else {
      fetchPubliceReview();
    }
  };

  const MoreReviews = () => {
    page.current += 1;
    fetchReviews();
  };

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
      </GridLayout>
    </Container>
  );
};

export default MyReview;
