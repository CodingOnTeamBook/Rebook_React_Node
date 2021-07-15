import Grid from '@material-ui/core/Grid';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import UserInfo from '../../components/PeopleDetialComponent/UserInfo';
import ReviewMain from '../../components/ReviewComponent/ReviewMain';

const PeopleDetailContainer = styled(Grid)`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  height: 100%;
`;

const UserInfoContainer = styled(Grid)`
  position: sticky;
  top: 0px;
  height: 100%;
  /* margin-right: 10px; */
`;

const UserReviewContainer = styled(Grid)`
  background-color: white;
  width: 100%;
  z-index: 9;
`;

const PeopleDetailPage: FunctionComponent = () => {
  return (
    <PeopleDetailContainer container alignContent="center">
      <UserInfoContainer item xs={12} sm={4} zeroMinWidth>
        <UserInfo />
      </UserInfoContainer>
      <UserReviewContainer item xs={12} sm={8} zeroMinWidth>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
            <ReviewMain />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewMain />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewMain />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewMain />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReviewMain />
          </Grid> */}
        </Grid>
      </UserReviewContainer>
    </PeopleDetailContainer>
  );
};

export default PeopleDetailPage;
