import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  h2 {
    margin-top: 0.4rem;
    margin-bottom: 0;
    padding: 0;
    text-align: center;
    font-size: 16px;
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
}

const BookInfo = ({ imgUrl, title, author }: IProps) => {
  return (
    <Container>
      <ImgArea>
        <img src={imgUrl} />
      </ImgArea>
      <h2>{title}</h2>
      <p>{author}</p>
    </Container>
  );
};

export default BookInfo;
