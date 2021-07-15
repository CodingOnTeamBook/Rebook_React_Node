import React, { FunctionComponent } from 'react';
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

const UserReviewContainer = styled(Box)`
  border-radius: 20px;
  position: relative;
  background-color: white;
  padding: 3%;
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

const UserNickName = styled.div`
  font-weight: 900;
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const UserWrite = styled.p`
  width: 100%;
  font-size: 1.2rem;
`;

const ReviewTime = styled.p`
  font-size: 1rem;
  color: #808080;
  font-size: 8px;
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

const UserReview: FunctionComponent = () => {
  // 테스트 데이터
  const REVIEW_DATA = [
    {
      id: 10,
      text: 'review/text/bb_1625672657116_test.html',
      book_info: 'sdfsdf',
      summary: '리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰',
      score: 4,
      coverImg: 'review/cover/sdfsdf_test.JPG',
      view_count: 0,
      isPublic: true,
      like_count: 2,
      createdAt: '2021-07-07T15:44:17.138Z',
      updatedAt: '2021-07-07T15:44:17.138Z',
      tags: [
        {
          id: 27,
          tag: '#리뷰',
        },
        {
          id: 28,
          tag: '#리리뷰',
        },
        {
          id: 29,
          tag: '#리리뷰',
        },
        {
          id: 30,
          tag: '#리리리뷰',
        },
      ],
      user: {
        id: 2,
        userId: '1234',
        nickname: '마크 주커버그',
        genres: '',
        gender: 'Secret',
        ageRange: 'Secret',
        profileImg: 'defaultImg',
        info: '안녕하세용~~☺',
        createdAt: '2021-06-28T08:39:00.108Z',
        updatedAt: '2021-06-28T08:39:00.162Z',
      },
    },
  ];

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
    <UserReviewContainer boxShadow={2}>
      {REVIEW_DATA.map((review) => (
        <Box display="flex" flexDirection="column" key={review.id}>
          <Box display="flex" flexDirection="row" flexWrap="nowrap">
            <UserImg
              alt={review.user.nickname}
              src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
            />
            <Box width={1}>
              <UserNickName>{review.user.nickname}</UserNickName>
              <Rating
                size="large"
                name="read-only"
                value={review.score}
                readOnly
              />
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {/* 중첩 map 이렇게 사용 */}
                {review.tags.map((reviewTag) => (
                  <BookTag key={reviewTag.id}>
                    <ChipColor label={reviewTag.tag} />
                  </BookTag>
                ))}
              </Box>
              <UserWrite> {review.summary} </UserWrite>
              <ReviewTime> {TransferDate(review.updatedAt)} </ReviewTime>
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
            <h3> {review.like_count}명이 리뷰를 좋아합니다. </h3>
          </Box>
        </Box>
      ))}
    </UserReviewContainer>
  );
};

export default UserReview;
