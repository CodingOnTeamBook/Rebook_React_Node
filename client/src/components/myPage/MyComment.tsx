import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import TransferDate from '../../globalFunction/TransferDate';

const Box = styled.div`
  padding: 2rem;
`;

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 55vw;
  margin-right: 2rem;
`;

const DateStyle = styled.h2`
  position: relative;
  font-size: 15px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.palette.black};
  line-height: 1;
  &:before {
    content: '';
    position: absolute;
    left: -48px;
    top: 50%;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    border-radius: 100%;
    box-sizing: border-box;
    background: #fff;
    border: 5px solid ${(props) => props.theme.palette.yellow};
  }
`;

const CommentContainer = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  padding-left: 48px;
  &:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    width: 2px;
    height: 100%;
    background: #ddd;
  }
  p {
    margin-bottom: 2.5rem;
    padding-left: 1.2rem;
  }
`;

const MyComment = () => {
  const date1 = '2021-07-13T20:58:21.000Z';
  const date2 = '2021-07-11T20:58:21.000Z';
  const date3 = '2021-07-10T20:58:21.000Z';
  const date4 = '2021-07-09T20:58:21.000Z';
  const date5 = '2021-07-08T20:58:21.000Z';

  return (
    <Box>
      <h2>나의 댓글</h2>
      <Container>
        <CommentContainer>
          <DateStyle>{TransferDate(date5)}</DateStyle>
          <p>00님이 가입했어요.</p>
        </CommentContainer>
        <CommentContainer>
          <DateStyle>{TransferDate(date5)}</DateStyle>
          <CommentBox />
        </CommentContainer>
        <CommentContainer>
          <DateStyle>{TransferDate(date4)}</DateStyle>
          <CommentBox />
        </CommentContainer>
        <CommentContainer>
          <DateStyle>{TransferDate(date3)}</DateStyle>
          <CommentBox />
        </CommentContainer>
        <CommentContainer>
          <DateStyle>{TransferDate(date2)}</DateStyle>
          <CommentBox />
        </CommentContainer>
        <CommentContainer>
          <DateStyle>{TransferDate(date1)}</DateStyle>
          <CommentBox />
        </CommentContainer>
        <CommentContainer>
          <DateStyle></DateStyle>
        </CommentContainer>
      </Container>
    </Box>
  );
};

export default MyComment;
