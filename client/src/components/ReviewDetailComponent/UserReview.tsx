import React, { FunctionComponent, useState } from 'react';
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

const UserReviewContainer = styled(Box)`
  background-color: white;
  padding: 3% 3% 0 3%;
  width: 100%;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const UserWrite = styled.p`
  font-size: 1.2rem;
`;

const ReviewTime = styled.p`
  font-size: 1rem;
  color: #808080;
`;

const BookTag = styled(Chip)`
  margin-top: 5px;
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

const UserReview: FunctionComponent = () => {
  // 테스트용
  const test = 10;
  const tag = '#' + '태그';

  const [rating, setRating] = useState<number>(4);

  const { value, onChange, CheckedValue } = useCheck({
    name: 'MyLikeReview',
    initialValue: true,
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
    <UserReviewContainer>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" flexWrap="nowrap">
          <UserImg
            alt="Mark Zuckerberg"
            src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
          />
          <Box>
            <UserName>Mark Zuckerberg</UserName>
            <Rating size="large" name="read-only" value={rating} readOnly />
            <Box display="flex" flexDirection="row">
              <BookTag label={tag} />
              <BookTag label={tag} />
              <BookTag label={tag} />
            </Box>
            <UserWrite>
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            </UserWrite>
            <ReviewTime> 2일전 </ReviewTime>
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
          <h3> {test}명이 리뷰를 좋아합니다. </h3>
        </Box>
      </Box>
    </UserReviewContainer>
  );
};

export default UserReview;
