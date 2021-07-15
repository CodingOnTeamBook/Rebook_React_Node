import React, { FunctionComponent, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import GridItem from '../common/GridItem';
import axios from 'axios';

const ReviewMainContainer = styled(Box)`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
`;

const ImgCover = styled(Box)`
  width: 120px;
  height: 160px;
  overflow: hidden;
`;

const CardImg = styled.img`
  max-width: 95%;
  height: auto;
  object-fit: cover;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const BookTitle = styled(Box)`
  margin-bottom: 5px;
  font-size: x-large;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

// webkit 지원하지 않는 IE에서는 말줄임 작동X => 처음부터 길이 제한으로 summary를 저장하는 방법으로 해야할 듯?
const BookReview = styled.div`
  margin-top: 5px;
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  margin: 0.4rem 0;
`;

const Nickname = styled.span`
  font-size: 10px;
  flex: 1;
  &::before {
    content: 'by';
  }
`;

interface IReviewProps {
  id: number;
  cover: string;
  title: string;
  score: number;
  summary: string;
}

const ReviewMain: FunctionComponent<IReviewProps> = ({
  id,
  cover,
  title,
  score,
  summary,
}: IReviewProps) => {
  const history = useHistory();

  return (
    <GridItem>
      <ReviewMainContainer display="flex" flexDirection="column" boxShadow={1}>
        <Box
          display="flex"
          flexDirection="row"
          p={2}
          onClick={() => {
            history.push(`/review/${id}`);
          }}
        >
          <Box>
            <ImgCover>
              <CardImg alt={title} src={cover} />
            </ImgCover>
          </Box>
          <Box>
            <BookTitle> {title} </BookTitle>
            <Rating size="large" name="read-only" value={score} readOnly />
            <BookReview> {summary} </BookReview>
            <Nickname> 리북이님 </Nickname>
          </Box>
        </Box>
      </ReviewMainContainer>
    </GridItem>
  );
};

export default ReviewMain;
