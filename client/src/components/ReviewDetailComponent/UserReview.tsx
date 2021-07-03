import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';

const UserImg = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const UserName = styled.h3``;

const ReviewArea = styled.p`
  overflow-y: visible;
`;

const Like = styled.p`
  margin-left: 10px;
`;

const UserReview: FunctionComponent = () => {
  const test = '10';
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="center">
        <UserImg
          alt="Mark Zuckerberg"
          src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
        />
        <UserName>Mark Zuckerberg</UserName>
      </Box>
      <Box>
        <ReviewArea> 리뷰 리뷰 리뷰 리뷰 리뷰 </ReviewArea>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Favorite color="error" />
        <Like> {test}명이 리뷰를 좋아합니다. </Like>
      </Box>
    </Box>
  );
};

export default UserReview;
