import React from 'react';
import {
  Container,
  Header,
  Main,
  ItemContainer,
} from '../common/LandingPageCommon';

interface book {
  author: string;
  cover: string;
  description: string;
  isbn: string;
  link: string;
  pubDate: string;
  publisher: string;
  title: string;
}

interface IProps {
  bestSeller: Array<book> | null;
}

const BestSeller = ({ bestSeller }: IProps) => {
  return (
    <Container>
      <Header>
        <h2>이 책은 어때요?</h2>
      </Header>
      <Main>
        {bestSeller?.map((book: book, index: number) => (
          <ItemContainer to={`book/${book.isbn}`} key={index}>
            <img key={book.title} src={book.cover}></img>
            <h3 className="description">{book.title}</h3>
          </ItemContainer>
        ))}
      </Main>
    </Container>
  );
};

export default React.memo(BestSeller);
