import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BookProps } from '../../pages/BookDetailPage';

const BookDetailContainer = styled.main`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.white};

  .bookCover {
    border-radius: 16px;
    box-shadow: 0 12px 16px ${(props) => props.theme.palette.grey};
  }

  .detailContainer {
    margin-left: 2rem;
  }
`;

const BookDetail = ({ bookData }: BookProps) => {
  const [bookInfo, setbookInfo] = useState({ ...bookData });
  const { link, cover, title, author, publisher, pubDate, description } =
    bookInfo;

  console.log(bookInfo);

  return (
    <BookDetailContainer>
      <a href={link} target="blank">
        <img className="bookCover" src={cover} alt={cover} />
      </a>
      <div className="detailContainer">
        <h1>{title}</h1>
        <hr />
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
