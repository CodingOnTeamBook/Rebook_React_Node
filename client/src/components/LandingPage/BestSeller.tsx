import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Main,
  ItemContainer,
} from '../common/LandingPageCommon';
import axios from 'axios';

const BestSeller = () => {
  const [BestSeller, setBestSeller] = useState<any>([]);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('api/book/bestseller')
      .then(({ data: { bestSeller } }) => setBestSeller(bestSeller))
      .catch((err) => setErr(true));
  }, []);

  // 📌 To do
  // 에러시 화면이나 메시지 만들기 => 에러 모음 화면 만드는 것도 고려

  if (err) {
    return <div> 에러가 발생했습니다. 다시 시도해주세요. </div>;
  }

  return (
    <Container>
      <Header>
        <h2>이 책은 어때요?</h2>
      </Header>
      <Main>
        {BestSeller.map((book: any, index: number) => (
          <ItemContainer to={`book/${book.isbn}`} key={index}>
            <img key={book.title} src={book.cover}></img>
            <h3 className="description">{book.title}</h3>
          </ItemContainer>
        ))}
      </Main>
    </Container>
  );
};

export default BestSeller;
