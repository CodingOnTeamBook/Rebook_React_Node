import Grid from '@material-ui/core/Grid';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import UserInfo from '../../components/PeopleDetialComponent/UserInfo';
import ReviewItem from '../../components/ReviewComponent/ReviewItem';

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

//grid는 layout에서 가져다 쓰기(거의 똑같고, children type부분만 다름. 그런데 component라기 보다는 layout이기 때문에 따로 뺐음.)
//여기서 api호출 하고 page네이션도 가능하도록 구현
//값이 없을 때와 에러 부분 헨들링 , 에러는 에러 페이지로 redirect
//reviewMain은 사용자가 수정하는 부분이 없으므로 props로 넘김.

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
