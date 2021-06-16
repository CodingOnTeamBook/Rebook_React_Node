import React, { useState, FunctionComponent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';

const CardContainer = styled(Card)`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
`;

const BookInfo = styled.div`
  margin-bottom: 13px;
  width: 100%;
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

const useStyles = makeStyles(() =>
  createStyles({
    cardImg: {
      width: 155,
      height: 200,
    },
    cover: {
      width: '100%',
      height: '100%',
    },
  })
);

const RatingStars = {
  size: 30,
  count: 5,
  isHalf: false,
  value: 4,
  activeColor: '#ffd700',
  // onChange: newValue => {
  //   console.log(`Example 3: new value is ${newValue}`);
  // }
};

const BookDetailBookCard: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <CardContainer>
      <div className={classes.cardImg}>
        <CardMedia
          className={classes.cover}
          // 테스트용 입니다.
          image="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
          title="Live from space album cover"
        />
      </div>
      <CardContent>
        <CardTitle> 책제목 </CardTitle>
        <BookInfo> 작가/ 발행년도/ 장르/ 출판사 </BookInfo>
        <BookTag>
          <Chip label="#태그" /> <Chip label="#태그" /> <Chip label="#태그" />
        </BookTag>
        <BookRating>
          <ReactStars {...RatingStars} />
          <BookRatingScore>4.8</BookRatingScore>
        </BookRating>
      </CardContent>
    </CardContainer>
  );
};

export default BookDetailBookCard;
