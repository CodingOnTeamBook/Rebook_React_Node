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
import { myProfileImg } from '../../globalFunction/myInfoDefaultValue';

const CommentListContainer = styled(Box)`
  width: 100%;
  padding: 2% 2% 0 2%;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 1rem;
  img {
    padding: 0.4rem;
    border-radius: 50%;
  }
`;

const CommentDay = styled.span`
  color: #808080;
  font-size: 0.8rem;
`;

const CommentText = styled.p`
  margin-top: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.palette.green};
  padding: 20px;
  border-radius: 20px;
`;

const DividerBottom = styled(Divider)`
  margin-top: 10px;
`;

interface ICommentProps {
  nickname: string;
  profileImg: string;
  updateAt: string;
  text: string;
}

const CommentList: FunctionComponent<ICommentProps> = ({
  nickname,
  profileImg,
  updateAt,
  text,
}: ICommentProps) => {
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
      <Box>
        <Box display="flex" flexDirection="row">
          <UserImg alt={nickname} src={myProfileImg(profileImg)} />
          <Box display="flex" flexDirection="column" flexGrow="1">
            <span>{nickname}</span>
            <CommentDay> {TransferDate(updateAt)} </CommentDay>
            <CommentText> {text} </CommentText>
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
    </CommentListContainer>
  );
};

export default CommentList;
