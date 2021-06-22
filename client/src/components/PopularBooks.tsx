import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50vh;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    margin-top: 26px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
  margin-bottom: 20px;
  height: 100%;
  width: 100%;
`;

const BookContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: 0 16px;
  background-color: ${(props) => props.theme.palette.white};
  box-shadow: 0 8px 12px ${(props) => props.theme.palette.gray};
  cursor: pointer;

  img {
    height : 200px;
    box-shadow: 0 12px 16px ${(props) => props.theme.palette.gray};
  }

  .description {
    position: absolute;
    bottom: 0;
    background: ${(props) => props.theme.palette.yellow};
    width: 100%;
    transition: .5s ease;
    opacity: 0;
    padding: 20px;
    text-align: center;
  }

  &:hover .description {
    opacity: 1;
  }
}`;

// 📌 test용입니다. 추후 삭제 예정

const TEST_DATA = [
  {
    img: 'https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg',
    title: 'Title 111',
  },
  {
    img: 'https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg',
    title: 'Title 222',
  },
  {
    img: 'https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg',
    title: 'Title 333',
  },
  {
    img: 'https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg',
    title: 'Title 444',
  },
  {
    img: 'https://www.creativindie.com/wp-content/uploads/2012/07/stock-image-site-pinterest-graphic.jpg',
    title: 'Title 555',
  },
];

interface Props {
  img: string;
  title: string;
}

const TestBook: FunctionComponent<Props> = ({ img, title }: Props) => {
  return (
    <BookContainer>
      <img key={title} src={img}></img>
      <h3 className="description">{title}</h3>
    </BookContainer>
  );
};

const PopularBooks: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <h2>추천하는 도서</h2>
        <h3>더보기</h3>
      </Header>
      <Main>
        {TEST_DATA.map((elem, index) => (
          <TestBook key={index} img={elem.img} title={elem.title} />
        ))}
      </Main>
    </Container>
  );
};

export default PopularBooks;
