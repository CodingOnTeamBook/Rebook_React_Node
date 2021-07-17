import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  Main,
  ItemContainer,
} from '../common/LandingPageCommon';
import axios from 'axios';
import { setBookInfo } from '../../redux/book/action';
import { useDispatch } from 'react-redux';
import { bookInfo } from '../../redux/book/action';
import { useHistory } from 'react-router';

const BestSeller = () => {
  const [BestSeller, setBestSeller] = useState<any>([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // 📌 To do
    // 에러시 화면이나 메시지 만들기
    axios
      .get('api/book/bestseller')
      .then(({ data: { bestSeller } }) => setBestSeller(bestSeller))
      .catch((err) => console.log(err));
  }, []);

  const onClick = (index: number) => {
    const { isbn } = BestSeller[index];
    dispatch(setBookInfo({ ...BestSeller[index] }));
    history.push(`book/${isbn}`);
  };

  interface Props {
    onClick: () => void;
    bookInfo: bookInfo;
  }

  const BestSellerBook = ({ bookInfo, onClick }: Props) => {
    return (
      <ItemContainer onClick={() => onClick()}>
        <img key={bookInfo.title} src={bookInfo.cover}></img>
        <h3 className="description">{bookInfo.title}</h3>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <Header>
        <h2>이 책은 어때요?</h2>
      </Header>
      <Main>
        {BestSeller.map((book: any, index: number) => (
          <BestSellerBook
            key={index}
            onClick={() => onClick(index)}
            bookInfo={book}
          />
        ))}
      </Main>
    </Container>
  );
};

export default BestSeller;
