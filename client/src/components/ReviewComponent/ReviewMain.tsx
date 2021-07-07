import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import Favorite from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { FavoriteBorder } from '@material-ui/icons';

const ReviewMainContainer = styled(Box)`
  width: 100%;
`;

const ImgCover = styled(Box)`
  width: 162px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookTitle = styled(Box)`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  width: 170px;
`;

const BookTag = styled.div`
  margin-bottom: 10px;
`;

// webkit 지원하지 않는 IE에서는 말줄임 작동X
const BookReview = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Nickname = styled.span`
  flex: 1;
  &::before {
    content: 'by';
  }
`;

const Like = styled.span`
  text-align: right;
  flex: 1;
`;

const ReviewMain: FunctionComponent = () => {
  const id = 'test';
  const history = useHistory();

  return (
    <>
      <ReviewMainContainer display="flex" flexDirection="column" boxShadow={1}>
        <Box
          display="flex"
          flexDirection="row"
          onClick={() => {
            history.push(`/review/${id}`);
          }}
        >
          <Box p={1}>
            <ImgCover>
              <CardImg
                alt="title"
                src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
              />
            </ImgCover>
          </Box>
          <Box p={1}>
            <BookTitle> 책제목책제목책제목책제목 </BookTitle>
            <BookTag>
              <Chip label="#태그" /> <Chip label="#태그" />
            </BookTag>
            <BookReview>
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰리뷰 리뷰
              리뷰리뷰리뷰리뷰리뷰리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            </BookReview>
          </Box>
        </Box>
        <Box display="flex" pl={1} boxShadow={1} alignItems="center">
          <Nickname> 리북이님 </Nickname>
          <Like>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="checkedH"
            />
          </Like>
        </Box>
      </ReviewMainContainer>
    </>
  );
};

export default ReviewMain;
