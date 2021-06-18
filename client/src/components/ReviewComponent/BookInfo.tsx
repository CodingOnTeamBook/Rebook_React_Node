import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() =>
  createStyles({
    cardImg: {
      width: 250,
      height: 200,
    },
    cover: {
      marginLeft: '10px',
      width: '100%',
      height: '100%',
    },
  })
);

const CardContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-right: 10px;
`;

const CardTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
`;

const BookInfoArea = styled.div`
  margin-bottom: 13px;
  height: 50px;
  /* 확인용 컬러 입니다! */
  background: ${(props) => props.theme.palette.yellow};
`;

const BookTag = styled.div``;

const BookRating = styled.div`
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BookRatingScore = styled.div`
  margin-left: 15px;
`;

const RatingStars = {
  size: 30,
  count: 5,
  isHalf: false,
  value: 4,
  // 리뷰를  api에서 가져오는거니까 Readonly로 하였습니다!
  edit: false,
  activeColor: '#ffd700',
};

const BookInfo: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" zeroMinWidth>
      <div className={classes.cardImg}>
        <CardMedia
          className={classes.cover}
          // 테스트용 입니다.
          image="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
          title="Live from space album cover"
        />
      </div>
      <CardContents>
        <CardTitle> 책제목 </CardTitle>
        <BookInfoArea> 작가 / 발행년도 / 장르 / 출판사 </BookInfoArea>
        <BookTag>
          <Chip label="#태그" /> <Chip label="#태그" /> <Chip label="#태그" />
        </BookTag>
        <BookRating>
          <ReactStars {...RatingStars} />
          <BookRatingScore>4.8</BookRatingScore>
        </BookRating>
      </CardContents>
    </Grid>
  );
};

export default BookInfo;
