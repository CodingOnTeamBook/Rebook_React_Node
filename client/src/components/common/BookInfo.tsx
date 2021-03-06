import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  cursor: pointer;

  h2 {
    margin-top: 0.4rem;
    margin-bottom: 0;
    padding: 0;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    width: 100%;
    height: 24px;
  }
  p {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 12px;
  }
`;

const ImgArea = styled.div`
  width: 100%;
  height: 240px;
  margin: 0;
  padding: 0;
  box-shadow: 2px 2px 5px rgba(80, 80, 80, 0.55);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface IProps {
  imgUrl: string;
  title: string;
  author: string;
  onClick: () => void;
}

const BookInfo = ({ imgUrl, title, author, onClick }: IProps) => {
  return (
    <Container onClick={onClick}>
      <ImgArea>
        <img src={imgUrl} />
      </ImgArea>
      <h2 title={title}>{title}</h2>
      <p>{author}</p>
    </Container>
  );
};

export default BookInfo;
