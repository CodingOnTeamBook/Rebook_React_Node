import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import Divider from '@material-ui/core/Divider';

const BookCover = styled(Box)`
  width: 250px;
  height: 350px;
`;

const BookImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-right: 10%;
  object-fit: cover;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const BookTitle = styled.span`
  font-size: 2rem;
  margin-bottom: 10px;
  cursor: pointer;
`;

const BookInfoDetail = styled.span`
  margin-bottom: 15px;
  font-size: 1.4rem;
  &::after {
    content: '|';
  }
  &:last-child:after {
    content: '';
  }
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

const BookPlot = styled(Box)`
  font-size: 1.2rem;
`;

const Message = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
`;

const BookInfo = ({ bookInfo, isbn }: any) => {
  const history = useHistory();

  return (
    <>
      {!bookInfo ? (
        <Message></Message>
      ) : (
        <Box display="flex" flexDirection="row">
          <Grid container>
            <Grid item lg={3} xl={3}>
              <BookCover>
                <BookImg
                  alt={bookInfo?.title}
                  src={bookInfo?.cover}
                  onClick={() => history.push(`/book/${isbn}`)}
                />
              </BookCover>
            </Grid>
            <Grid item xs={12} sm={12} lg={9} xl={9}>
              <Box display="flex" flexDirection="column">
                <BookTitle onClick={() => history.push(`/book/${isbn}`)}>
                  {bookInfo?.title}
                </BookTitle>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                  <BookInfoDetail> {bookInfo?.author} </BookInfoDetail>
                  <BookInfoDetail> {bookInfo?.pubDate} </BookInfoDetail>
                  <BookInfoDetail> {bookInfo?.publisher} </BookInfoDetail>
                </Box>
                <Divider />
                <BookPlot>
                  <p> {bookInfo?.description} </p>
                </BookPlot>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default BookInfo;
