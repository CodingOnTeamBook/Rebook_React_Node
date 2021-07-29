import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import shortReviewSummary from 'globalFunction/shortReviewSummary';

const ReviewMainContainer = styled(Box)`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
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

const BookReview = styled.div`
  margin-top: 5px;
  overflow: hidden;
  font-size: 13px;
  height: 60px;
`;

const Nickname = styled.span`
  font-size: 11px;
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
  writer: string;
}

const ReviewItem: FunctionComponent<IReviewProps> = ({
  id,
  cover,
  title,
  score,
  summary,
  writer,
}: IReviewProps) => {
  const history = useHistory();

  return (
    <ReviewMainContainer display="flex" flexDirection="column" boxShadow={3}>
      <Box
        display="flex"
        flexDirection="row"
        p={1}
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
          <BookReview> {shortReviewSummary(summary)} </BookReview>
          <Nickname> {writer} </Nickname>
        </Box>
      </Box>
    </ReviewMainContainer>
  );
};

export default ReviewItem;
