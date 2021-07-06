import React from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../style/componentStyled';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  width: 80%;
  min-height: 150px;
  border-radius: 16px;
  margin: 1rem;
  border: 2px solid ${(props) => props.theme.palette.darkgreen};
  background: ${(props) => props.theme.palette.darkgreen};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ProfileInfo = styled.div`
  width: 60%;
  h3 {
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }
  p {
    margin: 0;
    font-size: 10px;
  }
`;

const GenreInfo = styled.div`
  margin-top: 1rem;
  width: 100%;
  p {
    padding: 0.4rem;
    background-color: ${(props) => props.theme.palette.yellow};
    border-radius: 50%;
    display: inline;
    margin: 0.3rem;
  }
`;

const MenuContainer = styled.ul`
  margin: 1rem;
  padding: 0;
  width: 80%;
  height: 100%;
  border: 2px solid ${(props) => props.theme.palette.green};
  border-radius: 16px;
`;

const MenuItemContainer = styled.li`
  width: 100%;
  height: 2.5rem;
  list-style: none;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  &:hover {
    color: ${(props) => props.theme.palette.darkgreen};
  }
`;

const SideMenu = () => {
  const imgUrl =
    'https://cdn.pixabay.com/photo/2021/05/17/01/39/iris-6259565_960_720.jpg';
  return (
    <>
      <ProfileContainer>
        <ProfileImg src={imgUrl} alt="profileImg" />
        <ProfileInfo>
          <h3>리북이</h3>
          <p>10대/ 여</p>
          <GenreInfo>
            <p>#소설</p>
            <p>#사회과학</p>
            <p>#인문학</p>
          </GenreInfo>
        </ProfileInfo>
      </ProfileContainer>
      <MenuContainer>
        <Link to="/my?tab=info">
          <MenuItemContainer>내 정보</MenuItemContainer>
        </Link>
        <Link to="/my?tab=review">
          <MenuItemContainer>나의 리뷰</MenuItemContainer>
        </Link>
        <Link to="/my?tab=comment">
          <MenuItemContainer>나의 댓글</MenuItemContainer>
        </Link>
        <Link to="/my?tab=like">
          <MenuItemContainer>좋아요 한 게시물</MenuItemContainer>
        </Link>
        <Link to="/my?tab=follow">
          <MenuItemContainer>팔로잉</MenuItemContainer>
        </Link>
      </MenuContainer>
    </>
  );
};

export default SideMenu;
