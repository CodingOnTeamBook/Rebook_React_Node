import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import ReactStars from 'react-rating-stars-component';

const ReviewMainContainer = styled(Box)`
  width: 100%;
  cursor: pointer;
`;

const ImgCover = styled(Box)`
  width: 162px;
  /* width: auto;
  height: auto; */
`;

const CardImg = styled.img`
  max-width: 95%;
  height: auto;
  object-fit: cover;
`;

const BookTitle = styled(Box)`
  font-size: x-large;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const BookTag = styled.div`
  margin-bottom: 10px;
`;

// webkit 지원하지 않는 IE에서는 말줄임 작동X
const BookReview = styled.div`
  margin-top: 10px;
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

const RatingStars = {
  size: 30,
  count: 5,
  isHalf: false,
  value: 4,
  // 리뷰를 api에서 가져오는거니까 Readonly로 하였습니다!
  edit: false,
  activeColor: '#ffd700',
};

const ReviewMain: FunctionComponent = () => {
  const id = 'test';
  const history = useHistory();

  return (
    <>
      <ReviewMainContainer display="flex" flexDirection="column" boxShadow={1}>
        <Box
          display="flex"
          flexDirection="row"
          p={2}
          onClick={() => {
            history.push(`/review/${id}`);
          }}
        >
          <Box>
            <ImgCover>
              <CardImg
                alt="title"
                src="https://prodimage.images-bn.com/pimages/9781338311501_p0_v2_s550x406.jpg"
              />
            </ImgCover>
          </Box>
          <Box>
            <BookTitle> 책제목책제목책제목책제목 </BookTitle>
            <ReactStars {...RatingStars} />
            <BookReview>
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            </BookReview>
          </Box>
        </Box>
        <Box
          display="flex"
          pt={1}
          pb={1}
          pl={2}
          boxShadow={1}
          alignItems="center"
        >
          <Nickname> 리북이님 </Nickname>
        </Box>
      </ReviewMainContainer>
    </>
  );
};

export default ReviewMain;
