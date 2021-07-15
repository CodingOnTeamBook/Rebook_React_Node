import React, { FunctionComponent } from 'react';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TransferDate from '../../globalFunction/TransferDate';

const Title = styled.h1`
  margin-top: 0;
`;

const CommentListContainer = styled(Box)`
  width: 100%;
  padding: 2%;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 2rem;
  img {
    padding: 0.4rem;
    border-radius: 50%;
  }
`;

const ReviewTime = styled.span`
  color: #808080;
  font-size: 8px;
`;

const Review = styled.p`
  margin-top: 5px;
  font-size: 11px;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.palette.green};
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

  // 테스트 데이터
  const COMMENT_DATA = [
    {
      id: 1,
      text: '코멘트코멘트코멘트',
      createAt: '2021-07-01T10:39:28.000Z',
      updateAt: '2021-07-01T10:41:09.493Z',
      deleteAt: null,
      user: {
        nickname: '리북이',
        profileImg: null,
      },
    },
    {
      id: 2,
      text: '코코코 레드코',
      createAt: '2021-07-13T20:58:21.000Z',
      updateAt: '2021-07-13T20:58:32.764Z',
      deleteAt: null,
      user: {
        nickname: '오리훈제',
        profileImg: null,
      },
    },
  ];

  return (
    <CommentListContainer>
      <Title>Comment</Title>
      {COMMENT_DATA.map((comment) => (
        <Box key={comment.id}>
          <Box display="flex" flexDirection="row">
            <UserImg
              alt={comment.user.nickname}
              src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
            />
            <Box display="flex" flexDirection="column" flexGrow="1">
              <span>{comment.user.nickname}</span>
              <ReviewTime> {TransferDate(comment.updateAt)} </ReviewTime>
              <Review> {comment.text} </Review>
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
        </Box>
      ))}
    </CommentListContainer>
  );
};

export default CommentList;
