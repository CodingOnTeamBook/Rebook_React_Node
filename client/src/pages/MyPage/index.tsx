import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import MyInfo from '../../components/myPage/MyInfo';
import MyReview from '../../components/myPage/MyReview';
import LikeReview from '../../components/myPage/LikeReview';
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
  min-width: 70%;
`;

type activeTab = 0 | 1 | 2;

// layout 따로 빼고 나머지만 관리하는 방향으로 가면 좋을 것 같고,
// tab에 따라서 api 호출 다르게 해서 각 탭에 넣어주는게 베스트
// 수정, 삭제는 해당 component 안에서 작업

const MyPage: FunctionComponent = () => {
  const query = location.href.split('=');
  const tab = {
    0: <MyInfo />,
    1: <MyReview />,
    2: <LikeReview />,
  };
  let ActiveTab: activeTab = 0;
  if (query[1] === 'review') {
    ActiveTab = 1;
  }
  if (query[1] === 'like') {
    ActiveTab = 2;
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
