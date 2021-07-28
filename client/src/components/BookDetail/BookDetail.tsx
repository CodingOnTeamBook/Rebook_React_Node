import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const BookDetailContainer = styled.main`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 4px;

  .bookCover {
    border-radius: 16px;
    -webkit-box-shadow: 5px 5px 15px 1px #000000;
    box-shadow: 5px 5px 15px 1px #000000;
    object-fit: cover;
  }

  .detailContainer {
    margin-left: 2rem;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  marin: 0 auto;
  height: 50vh;
`;

const BookDetail = ({ bookInfo }: any) => {
  return (
    <>
      {!bookInfo ? (
        <LoadingBox>
          <CircularProgress size={70} />
        </LoadingBox>
      ) : (
        <BookDetailContainer>
          {' '}
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
      )}
    </>
  );
};

export default BookDetail;
