import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Main,
  ItemContainer,
} from '../common/LandingPageCommon';
import axios from 'axios';

interface Props {
  img: string;
  title: string;
  isbn?: number;
}

const BestSellerBook = ({ img, title, isbn }: Props) => {
  return (
    // 😎 To do : onClick시 isbn params으로 넘겨서 book/:id로 이동
    <ItemContainer onClick={(e) => console.log(isbn, title)}>
      <img key={title} src={img}></img>
      <h3 className="description">{title}</h3>
    </ItemContainer>
  );
};

const BestSeller = () => {
  const [BestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    axios
      .get('api/book/bestseller')
      .then(({ data: { bestSeller } }) => setBestSeller(bestSeller))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Header>
        <h2>이 책은 어때요?</h2>
      </Header>
      <Main>
        {BestSeller.map(({ title, isbn, coverLargeUrl }) => (
          <BestSellerBook
            key={isbn}
            isbn={isbn}
            img={coverLargeUrl}
            title={title}
          />
        ))}
      </Main>
    </Container>
  );
};

export default BestSeller;
