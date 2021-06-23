import React, { FunctionComponent } from 'react';
import Chip from '@material-ui/core/Chip';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const CardImg = styled(Grid)`
  width: 150px;
`;

const ImgCover = styled.img`
  width: 100%;
  height: 100%;
`;

const CardContents = styled.div`
  width: 100%;
  height: 100%;
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
  // 리뷰를 api에서 가져오는거니까 Readonly로 하였습니다!
  edit: false,
  activeColor: '#ffd700',
};

const BookInfo: FunctionComponent = () => {
  return (
    <Grid container spacing={2}>
      <CardImg item>
        <ImgCover
          alt="title"
          src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
        />
      </CardImg>
      <Grid item xs container direction="column">
        <Grid item xs>
          <CardContents>
            <CardTitle> 책제목 </CardTitle>
            <BookInfoArea> 작가 / 발행년도 / 장르 / 출판사 </BookInfoArea>
            <BookTag>
              <Chip label="#태그" /> <Chip label="#태그" />
            </BookTag>
            <BookRating>
              <ReactStars {...RatingStars} />
              <BookRatingScore>4.8</BookRatingScore>
            </BookRating>
          </CardContents>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookInfo;
