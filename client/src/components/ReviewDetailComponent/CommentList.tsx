import React, { FunctionComponent } from 'react';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const CommentListContainer = styled(Box)`
  width: 100%;
`;

const UserImg = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const UserName = styled.span``;

const ReviewTime = styled.span`
  color: #808080;
`;

const Review = styled.p``;

const DividerBottom = styled(Divider)`
  margin-bottom: 10px;
`;

const CommentList: FunctionComponent = () => {
  return (
    <CommentListContainer>
      <Box display="flex" flexDirection="row">
        <UserImg
          alt="Mark Zuckerberg"
          src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
        />
        <Box display="flex" flexDirection="column">
          <UserName>Mark Zuckerberg</UserName>
          <ReviewTime> 1일전 </ReviewTime>
          <Review> 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 </Review>
        </Box>
      </Box>
      <DividerBottom />
      <Box display="flex" flexDirection="row">
        <UserImg
          alt="Mark Zuckerberg"
          src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
        />
        <Box display="flex" flexDirection="column">
          <UserName>Mark Zuckerberg</UserName>
          <ReviewTime> 1일전 </ReviewTime>
          <Review>
            와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄
            와라라라ㅏ라라라라ㅏ라라라ㅏ라랄
          </Review>
        </Box>
      </Box>
      <DividerBottom />
    </CommentListContainer>
  );
};

export default CommentList;
