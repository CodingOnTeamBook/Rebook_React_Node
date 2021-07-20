import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/rootReducer';

const BookDetailContainer = styled.main`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.white};
  border-radius: 4px;
  .bookCover {
    width: 187px;
    height: 250px;
    border-radius: 16px;
    img {
      box-shadow: 0 12px 16px rgba(40, 40, 40, 0.4);
      object-fit: cover;
    }
  }

  .detailContainer {
    margin-left: 2rem;
  }
`;

const BookDetail: FunctionComponent = () => {
  const { bookInfo } = useSelector((state: RootState) => state.book);

  return (
    <BookDetailContainer>
      <a href={bookInfo?.link} target="blank">
        <img
          className="bookCover"
          src={bookInfo?.cover}
          alt={bookInfo?.cover}
        />
      </a>
      <div className="detailContainer">
        <h1>{bookInfo?.title}</h1>
        <hr />
        <h2>
          <span>{bookInfo?.author}</span>
          {' | '}
          <span>{bookInfo?.publisher}</span>
        </h2>
        <h3>{bookInfo?.pubDate}</h3>
        <h3>{bookInfo?.description}</h3>
      </div>
    </BookDetailContainer>
  );
};

export default BookDetail;
