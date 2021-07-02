import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// 📍 Test Api info
const TEST_BOOK_INFO = {
  title:
    '공부하기가 죽기보다 싫을 때 읽는 책 - 지루함을 못 참는 이들을 위한 맞춤형 공부법',
  link: 'http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=206699988&amp;partner=openAPI&amp;start=api',
  author: '권혁진 (지은이)',
  pubDate: '2019-09-10',
  description:
    '공부하기 싫은 마음을 이해하고 공감하며 지루하지 않게 공부하는 법을 다룬다. 기존의 공부법 책들처럼 강한 의지를 요구하거나 거짓 꿈을 만들어 동기 부여하기를 바라지 않는다. 공부를 위해 참고 버티라고도 하지 않는다. 그저 있는 그대로의 자기 성향대로 가장 적합한 환경에서 공부할 수 있는 맞춤형 공부법을 제시한다.',
  isbn: 'K182636267',
  isbn13: '9791187962755',
  itemId: 206699988,
  priceSales: 13500,
  priceStandard: 15000,
  mallType: 'BOOK',
  stockStatus: '',
  mileage: 750,
  cover: 'https://image.aladin.co.kr/product/20669/99/cover/k182636267_1.jpg',
  categoryId: 70223,
  categoryName: '국내도서>자기계발>창의적사고/두뇌계발',
  publisher: '다연',
  salesPoint: 3652,
  adult: false,
  fixedPrice: true,
  customerReviewRank: 9,
  subInfo: {},
};

const BookDetailContainer = styled.main`
  display: flex;
  justify-contents: center;
  margin-top: 2rem;
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.white};

  .bookCover {
    border-radius: 16px;
    width: 250px;
    height: 350px;
    box-shadow: 0 12px 16px ${(props) => props.theme.palette.gray};
  }

  .detailContainer {
    margin-left: 2rem;
  }
`;

const BookDetail: FunctionComponent = () => {
  const { link, cover, title, author, publisher, pubDate, description } =
    TEST_BOOK_INFO;

  return (
    <BookDetailContainer>
      <a href={link} target="blank">
        <img className="bookCover" src={cover} />
      </a>
      <div className="detailContainer">
        <h1>{title}</h1>
        <h2>
          <span>{author}</span>
          {' | '}
          <span>{publisher}</span>
        </h2>
        <h3>{pubDate}</h3>
        <h3>{description}</h3>
      </div>
    </BookDetailContainer>
  );
};

export default BookDetail;
