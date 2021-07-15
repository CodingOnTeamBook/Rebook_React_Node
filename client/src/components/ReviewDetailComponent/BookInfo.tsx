import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const BookCover = styled(Box)`
  width: 250px;
`;

const BookImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const BookTitle = styled.span`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const BookInfoDetail = styled.span`
  margin-bottom: 15px;
  font-size: 1.4rem;
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

const BookPlot = styled(Box)`
  font-size: 1.2rem;
`;

const BookInfo: FunctionComponent = () => {
  // test용 입니당
  const writer = '작가';
  const year = '발행년도';
  const genre = '장르';
  const publisher = '출판사';

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Grid container>
          <Grid item>
            <BookCover mr={2}>
              <BookImg
                alt="title"
                src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
              />
            </BookCover>
          </Grid>
          <Grid item xs sm md>
            <Box display="flex" flexDirection="column">
              <BookTitle> 해리포터와 마법사의 돌 </BookTitle>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                <BookInfoDetail> {writer} </BookInfoDetail>
                <BookInfoDetail> {year} </BookInfoDetail>
                <BookInfoDetail> {genre} </BookInfoDetail>
                <BookInfoDetail> {publisher} </BookInfoDetail>
              </Box>
              <BookPlot>
                <p>
                  줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리
                  줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리
                  줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리
                  줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리
                </p>
              </BookPlot>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BookInfo;
