import React, { FunctionComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';

const PaperContainer = styled(Paper)`
  padding: 20px 20px 10px 20px;
  width: 100%;
`;

const UserName = styled.h4`
  margin: 0;
  text-align: left;
`;

const ReviewArea = styled.p`
  text-align: left;
  width: 100%;
  overflow-y: visible;
`;

const LikeArea = styled.div`
  width: 100%;
  text-align: left;
  color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0;
`;

const Like = styled.p`
  margin-left: 10px;
`;

const UserReview: FunctionComponent = () => {
  return (
    <PaperContainer elevation={0}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar
            alt="Mark Zuckerberg"
            src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
          />
        </Grid>
        <Grid item xs zeroMinWidth>
          <UserName>Mark Zuckerberg</UserName>
          <ReviewArea>
            리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰리뷰 리뷰
            리뷰리뷰리뷰리뷰리뷰리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            리뷰리뷰 리뷰 리뷰리뷰리뷰리뷰리뷰리뷰리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            리뷰 리뷰 리뷰리뷰 리뷰 리뷰리뷰리뷰리뷰리뷰리뷰리뷰 리뷰 리뷰 리뷰
            리뷰 리뷰 리뷰 리뷰 리뷰리뷰 리뷰 리뷰리뷰리뷰리뷰리뷰리뷰리뷰 리뷰
            리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰리뷰 리뷰 리뷰리뷰리뷰리뷰리뷰리뷰
          </ReviewArea>
          <LikeArea>
            <Favorite color="error" />
            <Like> 3명이 리뷰를 좋아합니다. </Like>
          </LikeArea>
        </Grid>
      </Grid>
    </PaperContainer>
  );
};

export default UserReview;
