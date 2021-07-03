import React, { FunctionComponent, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const BookInfoContainer = styled(Paper)`
  width: 100%;
  padding: 25px;
`;

const BookCover = styled(Box)`
  width: 200px;
  height: 250px;
`;

const BookImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookTitle = styled.span`
  font-size: 30px;
  margin-bottom: 10px;
`;

const BookInfoDetail = styled.span`
  /* width: 100%; */
  margin-bottom: 15px;
  font-size: 20px;
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
  const writer = '작가';
  const year = '발행년도';
  const genre = '장르';
  const publisher = '출판사';
  const tag = '#' + '태그';

  return (
    <BookInfoContainer>
      <Grid container>
        <Grid item>
          <BookCover mr={2}>
            <BookImg
              alt="title"
              src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
            />
          </BookCover>
        </Grid>
        <Box display="flex" flexDirection="column">
          <BookTitle> 해리포터 : 마법사의 돌 </BookTitle>
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
      </Grid>
    </BookInfoContainer>
  );
};

export default BookInfo;
