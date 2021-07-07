import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import { LineGreenBtn } from '../../style/componentStyled';
import MenuIconBtn from './MenuIconBtn';

const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  height: 200px;
  padding: 0.4rem;
  display: flex;
  box-shadow: 6px 6px 8px rgba(114, 114, 114, 0.15);
  transition: all 0.2s linear;
`;

const ImgArea = styled.div`
  width: 150px;
`;

const TextArea = styled.div`
  flex: 1;
  padding: 1rem;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 120px;
  height: 160px;
  position: relative;
  top: -20px;
  right: -15px;
  background-color: blue;
  box-shadow: 4px -4px 8px rgba(0, 0, 0, 0.34);
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.2s linear;
  }
  img:hover {
    transform: scale(1.2);
  }
`;

const BookInfo = styled.div`
  a {
    font-size: 15px;
    color: ${(props) => props.theme.palette.black};
    margin: 0;
    font-weight: bold;
    line-height: 1;
  }
  span {
    font-size: 8px;
    color: ${(props) => props.theme.palette.darkgray};
    margin-left: 0.5rem;
    font-weight: 300;
    line-height: 1;
  }
  margin: 0.2rem;
`;

const TextInfo = styled.div`
  font-size: 11px;
  overflow: hidden;
  margin: 0.2rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const MoreInfoBtn = styled(LineGreenBtn)`
  height: 30px;
  margin-top: 0.6rem;
`;

const SmallReview = () => {
  const [rating, setRating] = useState<number>(4);
  return (
    <Container>
      <ImgArea>
        <ImgContainer>
          <img
            alt="bookimg"
            src="http://image.yes24.com/momo/TopCate103/MidCate08/10270126.jpg"
          />
        </ImgContainer>
      </ImgArea>
      <TextArea>
        <MenuIconBtn />
        <BookInfo>
          <a href="">책 제목</a>
          <span>000 지음</span>
        </BookInfo>
        <Rating name="read-only" value={rating} readOnly />
        <TextInfo>
          리뷰 리뷰 리뷰 리뷰리뷰리뷰리뷰리뷰리뷰리
          뷰뷰리뷰리뷰리뷰리뷰뷰리뷰리뷰리뷰리뷰뷰리뷰리뷰리뷰리뷰
        </TextInfo>
        <MoreInfoBtn>더 보기</MoreInfoBtn>
      </TextArea>
    </Container>
  );
};

export default SmallReview;
