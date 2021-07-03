import React, { FunctionComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ArrowForwardOutlined from '@material-ui/icons/ArrowForwardOutlined';
import styled from 'styled-components';

const AddCommentContainer = styled(Box)`
  width: 100%;
`;

const UserImg = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const InputArea = styled(InputBase)`
  width: 100%;
`;

const AddComment: FunctionComponent = () => {
  return (
    <AddCommentContainer>
      <Box display="flex" flexDirection="row" alignItems="center">
        <UserImg
          alt="Mark Zuckerberg"
          src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
        />
        <InputArea placeholder="댓글을 입력해주세요..." multiline rows="2" />
        <IconButton type="submit">
          <ArrowForwardOutlined />
        </IconButton>
      </Box>
    </AddCommentContainer>
  );
};

export default AddComment;
