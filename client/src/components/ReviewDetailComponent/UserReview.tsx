import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';

const UserReviewContainer = styled(Paper)`
  padding: 25px 25px 25px 25px;
  max-width: 50rem;
`;

const UserImg = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 20px;
`;

const Review = styled.p`
  overflow-y: visible;
`;

const Like = styled.span`
  margin-left: 10px;
`;

const ReviewTime = styled.p`
  color: #808080;
`;

const UserReview: FunctionComponent = () => {
  const test = '10';
  return (
    <UserReviewContainer>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <UserImg
            alt="Mark Zuckerberg"
            src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
          />
          <Box>
            <UserName>Mark Zuckerberg</UserName>
            <Review>
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            </Review>
            <ReviewTime> 2일전 </ReviewTime>
          </Box>
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
    </UserReviewContainer>
  );
};

export default UserReview;
