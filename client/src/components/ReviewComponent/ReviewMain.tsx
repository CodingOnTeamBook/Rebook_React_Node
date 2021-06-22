import React, { FunctionComponent, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SimpleModal from '../../components/common/SimpleModal';
import ReviewModal from '../../components/ReviewComponent/ReviewModal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import Favorite from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import { FavoriteBorder } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      padding: theme.spacing(2),
      overflow: 'visible',
    },
    cardImg: {
      width: 162,
      height: 200,
    },
    cover: {
      width: '100%',
      height: '100%',
    },
  })
);

const BookContents = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const BookTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 200px;
  overflow: hidden;
`;

const BookTag = styled.div`
  margin-bottom: 10px;
`;

// webkit 지원하지 않는 IE에서는 말줄임 작동X
const BookReview = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;

const ReviewUserInfo = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Like = styled.div`
  margin-left: auto;
`;

const ReviewMain: FunctionComponent = () => {
  const [isReviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  const ReviewModalOpen = () => {
    setReviewModalOpen(!isReviewModalOpen);
  };

  const classes = useStyles();

  return (
    // 3 * 4 = 12
    <Grid item xs={4} zeroMinWidth>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.cardImg}>
            <img
              className={classes.cover}
              alt="title"
              src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
            />
          </Grid>
          <Grid item xs container direction="column">
            <Grid item xs>
              <BookContents>
                <BookTitle> 책제목책제목책제목책제목 </BookTitle>
                <BookTag>
                  <Chip label="#태그" /> <Chip label="#태그" />
                </BookTag>
                {/* 리뷰 부분 클릭 시 리뷰 모달 동작 */}
                <BookReview onClick={ReviewModalOpen}>
                  리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰리뷰 리뷰
                  리뷰리뷰리뷰리뷰리뷰리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
                </BookReview>
                <ReviewUserInfo>
                  by 리북이님
                  <Like>
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  </Like>
                </ReviewUserInfo>
              </BookContents>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {/* modal */}
      <SimpleModal open={isReviewModalOpen} setOpen={ReviewModalOpen}>
        <ReviewModal handleClose={ReviewModalOpen}></ReviewModal>
      </SimpleModal>
    </Grid>
  );
};

export default ReviewMain;
