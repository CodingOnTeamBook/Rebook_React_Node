import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Header,
  Main,
  ItemContainer,
} from './common/LandingPageCommon';

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
    <ItemContainer>
      <img key={title} src={img}></img>
      <h3 className="description">{title}</h3>
    </ItemContainer>
  );
};

const RecommendedBooks: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <h2>추천하는 도서</h2>
        <h3>
          <Link to="/recommend">더보기</Link>
        </h3>
      </Header>
      <Main>
        {TEST_DATA.map((elem, index) => (
          <TestBook key={index} img={elem.img} title={elem.title} />
        ))}
      </Main>
    </Container>
  );
};

export default RecommendedBooks;
