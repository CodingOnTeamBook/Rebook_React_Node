import React, { FunctionComponent, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

const BookCover = styled(Box)`
  width: 200px;
  height: 250px;
`;

const BookImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 10px;
`;

const BookInfoDetail = styled.h3`
  margin-top: 0px;
  &::after {
    content: '|';
  }
  &:last-child:after {
    content: '';
  }
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

const BookTag = styled(Chip)`
  margin-top: 0;
  margin-bottom: 10px;
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

const RatingStars = {
  size: 30,
  count: 5,
  isHalf: false,
  value: 4,
  // 리뷰를 api에서 가져오는거니까 Readonly로 하였습니다!
  edit: false,
  activeColor: '#ffd700',
};

const BookInfo: FunctionComponent = () => {
  // test용 입니당
  const writer = '롤링';
  const year = '1997';
  const genre = '판타지';
  const publisher = '출판사';
  const tag = '#' + '판타지';

  return (
    <Box>
      <Box display="flex" flexDirection="row">
        <BookCover mr={2}>
          <BookImg
            alt="title"
            src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
          />
        </BookCover>
        <Box display="flex" flexDirection="column">
          <BookTitle> 해리포터 마법사의 돌 </BookTitle>
          <Box display="flex" flexDirection="row">
            <BookInfoDetail> {writer} </BookInfoDetail>
            <BookInfoDetail> {year} </BookInfoDetail>
            <BookInfoDetail> {genre} </BookInfoDetail>
            <BookInfoDetail> {publisher} </BookInfoDetail>
          </Box>
          <Box display="flex" flexDirection="row">
            <BookTag label={tag} />
            <BookTag label={tag} />
            <BookTag label={tag} />
          </Box>
          <ReactStars {...RatingStars} />
        </Box>
      </Box>
    </Box>
  );
};

export default BookInfo;
