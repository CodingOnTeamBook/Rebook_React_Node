import React from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../style/componentStyled';
import MenuIconBtn from './MenuIconBtn';

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.palette.white};
  margin: 1rem;
  margin-bottom: 2.2rem;
  padding: 1rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReviewerProfileImg = styled(ProfileImg)`
  padding: 0.2rem;
  border: 2px solid ${(props) => props.theme.palette.yellow};
`;

const RevewerProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  width: 20%;
  cursor: pointer;
  h2 {
    font-size: 14px;
    line-height: 1;
    padding: 0;
    color: #4d4d4d;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  justify-content: space-around;
  margin: 1rem;
`;

const TitleArea = styled.div`
  font-size: 12px;
  line-height: 1;
  color: #4d4d4d;
  font-weight: 500;
  cursor: pointer;
`;

const CommentArea = styled.div`
  width: 90%;
  height: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-size: 13px;
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 16px;
`;

const MenuArea = styled.div`
  position: relative;
  height: 100%;
`;

const CommentBox = () => {
  return (
    <Container>
      <RevewerProfile>
        <ReviewerProfileImg src="https://cdn.pixabay.com/photo/2020/10/12/22/15/glass-5650335_960_720.jpg" />
        <h2>토리</h2>
      </RevewerProfile>
      <TextArea>
        <CommentArea>
          댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
        </CommentArea>
        <TitleArea>from [도서제목] 리ㅠㅂ리뷰리뷰</TitleArea>
      </TextArea>
      <MenuArea>
        <MenuIconBtn />
      </MenuArea>
    </Container>
  );
};

export default CommentBox;
