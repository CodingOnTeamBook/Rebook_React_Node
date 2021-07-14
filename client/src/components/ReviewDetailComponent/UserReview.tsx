import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactStars from 'react-rating-stars-component';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import { FavoriteBorder } from '@material-ui/icons';

const UserReviewContainer = styled(Paper)`
  padding: 2rem;
  width: 100%;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 2rem;
  img {
    padding: 0.4rem;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.palette.green};
  }
`;

const UserName = styled.span`
  font-size: 14px;
`;

const ReviewTime = styled.p`
  color: #808080;
  font-size: 8px;
`;

const BookTag = styled(Chip)`
  margin-top: 10px;
  font-size: 10px;
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

const RatingStars = {
  size: 20,
  count: 5,
  isHalf: false,
  value: 4,
  // 리뷰를 api에서 가져오는거니까 Readonly로 하였습니다!
  edit: false,
  activeColor: '#ffd700',
};

const UserReview: FunctionComponent = () => {
  const ITEM_HEIGHT = 48;
  // 테스트용
  const test = 10;
  const tag = '#' + '태그';

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
            <ReactStars {...RatingStars} />
            <Box display="flex" flexDirection="row">
              <BookTag label={tag} />
              <BookTag label={tag} />
              <BookTag label={tag} />
            </Box>
            <p style={{ fontSize: '10px' }}>
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            </p>
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
                  maxHeight: ITEM_HEIGHT * 3.3,
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
            name="checkedH"
          />
          <span style={{ fontSize: '12px' }}>
            {test}명이 리뷰를 좋아합니다.
          </span>
        </Box>
      </Box>
    </UserReviewContainer>
  );
};

export default UserReview;
