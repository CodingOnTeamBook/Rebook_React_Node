import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import MyInfo from '../../components/myPage/MyInfo';
import MyComment from '../../components/myPage/MyComment';
import MyReview from '../../components/myPage/MyReview';
import LikeReview from '../../components/myPage/LikeReview';
import FollowReviewer from '../../components/myPage/FollowReviewer';
import SideMenu from '../../components/myPage/sideMenu';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const SideMenuContainer = styled.div`
  flex: 1;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 25%;
`;

const ContentsContainer = styled.div`
  flex: 3;
  min-height: 100%;
  margin: 1rem;
  min-width: 70%;
  display: flex;
  justify-content: center;
  border-radius: 16px;
  border: 2px solid ${(props) => props.theme.palette.green};
`;

type activeTab = 0 | 1 | 2 | 3 | 4;

const MyPage: FunctionComponent = () => {
  const query = location.href.split('=');
  const tab = {
    0: <MyInfo />,
    1: <MyReview />,
    2: <MyComment />,
    3: <LikeReview />,
    4: <FollowReviewer />,
  };
  let ActiveTab: activeTab = 0;
  if (query[1] === 'review') {
    ActiveTab = 1;
  }
  if (query[1] === 'comment') {
    ActiveTab = 2;
  }
  if (query[1] === 'like') {
    ActiveTab = 3;
  }
  if (query[1] === 'follow') {
    ActiveTab = 4;
  }
  return (
    <Container>
      <SideMenuContainer>
        <SideMenu />
      </SideMenuContainer>
      <ContentsContainer>{tab[ActiveTab]}</ContentsContainer>
    </Container>
  );
};

export default MyPage;
