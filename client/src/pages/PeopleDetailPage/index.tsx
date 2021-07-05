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
`;

const UserReviewContainer = styled(Grid)`
  /* position: relative; */
`;

const MarginTop = styled.div`
  margin-top: 20px;
`;

const MarginTopTop = styled.div`
  margin-top: 30px;
`;

const PeopleDetailPage: FunctionComponent = () => {
  return (
    <PeopleDetailContainer container spacing={3}>
      <UserInfoContainer item xs={12} sm={4}>
        <UserInfo />
      </UserInfoContainer>
      <UserReviewContainer container item xs={12} sm={8} spacing={3}>
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
        </Grid>
      </UserReviewContainer>
    </PeopleDetailContainer>
  );
};

export default PeopleDetailPage;
