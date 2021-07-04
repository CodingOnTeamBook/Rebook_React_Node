import React, { FunctionComponent } from 'react';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

const Review = styled.p`
  margin-top: 5px;
  width: 100%;
  padding: 10px;
  /* height: 25%; */
  background-color: #e2e2e2;
  padding: 20px;
  border-radius: 20px;
`;

const DividerBottom = styled(Divider)`
  margin-bottom: 10px;
`;

const CommentList: FunctionComponent = () => {
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const menuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  return (
    <CommentListContainer>
      {/* <h1>Comment</h1> */}
      <Box display="flex" flexDirection="row">
        <UserImg
          alt="Mark Zuckerberg"
          src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
        />
        <Box display="flex" flexDirection="column" flexGrow="1">
          <UserName>Mark Zuckerberg</UserName>
          <ReviewTime> 1일전 </ReviewTime>
          <Review> 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 </Review>
        </Box>
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={menuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={menuClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '16ch',
              },
            }}
          >
            <MenuItem onClick={menuClose}>삭제</MenuItem>
            <MenuItem onClick={menuClose}>수정</MenuItem>
          </Menu>
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
            와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄
            와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄
            와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄
            와라라라ㅏ라라라라ㅏ라라라ㅏ라랄 와라라라ㅏ라라라라ㅏ라라라ㅏ라랄
          </Review>
        </Box>
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={menuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={menuClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '16ch',
              },
            }}
          >
            <MenuItem onClick={menuClose}>삭제</MenuItem>
            <MenuItem onClick={menuClose}>수정</MenuItem>
          </Menu>
        </Box>
      </Box>
      <DividerBottom />
    </CommentListContainer>
  );
};

export default CommentList;
