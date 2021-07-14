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
  border-radius: 16px;
  margin: 0.4rem;
  border: none;
  box-shadow: 5px 4px 4px rgba(40, 40, 40, 0.1);
  cursor: pointer;
  padding: 1rem;
`;

const ImgCover = styled(Box)`
  width: 120px;
  height: 160px;
  overflow: hidden;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const BookTitle = styled(Box)`
  font-size: 13px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  width: 170px;
`;

const BookTag = styled.div`
  div {
    margin: 0.4rem;
  }
`;

// webkit 지원하지 않는 IE에서는 말줄임 작동X => 처음부터 길이 제한으로 summary를 저장하는 방법으로 해야할 듯?
const BookReview = styled.div`
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Nickname = styled.span`
  font-size: 10px;
  flex: 1;
  &::before {
    content: 'by';
  }
`;

const Like = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
              <Chip label="#태그" variant="outlined" size="small" />
              <Chip label="#태그" variant="outlined" size="small" />
            </BookTag>
            <BookReview>
              리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰리뷰 리뷰
              리뷰리뷰리뷰리뷰리뷰리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰 리뷰
            </BookReview>
            <Nickname> 리북이님 </Nickname>
          </Box>
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
