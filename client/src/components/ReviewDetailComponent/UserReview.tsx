import React, { FunctionComponent, useState, useEffect } from 'react';
import useCheck from '../../hooks/useCheck';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import { FavoriteBorder } from '@material-ui/icons';
import TransferDate from '../../globalFunction/TransferDate';
import { myProfileImg } from '../../globalFunction/myInfoDefaultValue';
import { SERVER_URL } from 'config';

const UserReviewContainer = styled(Box)`
  border-radius: 20px;
  position: relative;
  background-color: white;
  padding: 3%;
  width: 100%;
`;

const UserWrapperContainer = styled(Box)`
  width: 100%;
  height: 100%;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 1rem;
  img {
    padding: 0.4rem;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.palette.green};
  }
`;

const UserNickName = styled.div`
  font-weight: 900;
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const UserWrite = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ReviewDay = styled.p`
  font-size: 1rem;
  color: #808080;
  font-size: 1rem;
`;

const ChipColor = styled(Chip)`
  background-color: ${(props) => props.theme.palette.green};
`;

const BookTag = styled(Box)`
  margin-top: 5px;
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

interface IUserReviewProps {
  score: number;
  text: any;
  nickname: string;
  profileImg: string;
  createdAt: string;
  like_count: number;
  tags: any;
}

const UserReview: FunctionComponent<IUserReviewProps> = ({
  score,
  text,
  nickname,
  profileImg,
  createdAt,
  like_count,
  tags,
}: IUserReviewProps) => {
  const { value, onChange, CheckedValue } = useCheck({
    name: 'MyLikeReview',
    initialValue: false,
  });
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
    <UserReviewContainer boxShadow={2}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" flexWrap="nowrap">
          <UserImg alt={nickname} src={myProfileImg(profileImg)} />
          <UserWrapperContainer width={1}>
            <UserNickName>{nickname}</UserNickName>
            <Rating size="large" name="read-only" value={score} readOnly />
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {tags.map((tag: any) => (
                <BookTag key={tag.id}>
                  <ChipColor label={tag.tag} />
                </BookTag>
              ))}
            </Box>
            <UserWrite
              dangerouslySetInnerHTML={{
                __html: `<iframe src="${SERVER_URL}/${text}" frameborder="0" width="100%" height="100%"></iframe>`,
              }}
            ></UserWrite>
            <ReviewDay> {TransferDate(createdAt)} </ReviewDay>
          </UserWrapperContainer>
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={value}
            onChange={onChange}
            name="MyLikeReview"
          />
          <h3> {like_count}명이 리뷰를 좋아합니다. </h3>
        </Box>
      </Box>
    </UserReviewContainer>
  );
};

export default UserReview;
