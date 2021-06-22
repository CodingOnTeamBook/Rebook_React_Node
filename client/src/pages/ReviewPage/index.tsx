import React, { FunctionComponent } from 'react';
import ReviewMain from '../../components/ReviewComponent/ReviewMain';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 30px;
  flex-grow: 1;
`;

const SortButton = styled(Button)`
  float: right;
  margin-bottom: 10px;
  margin-left: 10px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

const ReviewPage: FunctionComponent = () => {
  return (
    <Container>
      <SortButton variant="outlined" size="large">
        인기순
      </SortButton>
      <SortButton variant="outlined" size="large">
        최신순
      </SortButton>
      <Grid container spacing={3}>
        {/* 4 * 3  = 12 */}
        <ReviewMain />
        <ReviewMain />
        <ReviewMain />
      </Grid>
    </Container>
  );
};

export default ReviewPage;
