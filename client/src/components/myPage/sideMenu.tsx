import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuContainer = styled.ul`
  margin: 1rem;
  padding: 0;
  width: 80%;
  height: 100%;
  box-shadow: 2px 2px 4px rgba(40, 40, 40, 0.14);
`;

const MenuItemContainer = styled.li`
  width: 60%;
  height: 2.5rem;
  list-style: none;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  font-size: 12px;
  &:hover {
    color: ${(props) => props.theme.palette.darkgreen};
    border-bottom: 2px solid ${(props) => props.theme.palette.darkgreen};
  }
`;

const SideMenu = () => {
  return (
    <>
      <MenuContainer>
        <Link to="/my?tab=info">
          <MenuItemContainer>내 정보</MenuItemContainer>
        </Link>
        <Link to="/my?tab=review">
          <MenuItemContainer>나의 리뷰</MenuItemContainer>
        </Link>
        <Link to="/my?tab=like">
          <MenuItemContainer>좋아요</MenuItemContainer>
        </Link>
        <Link to="/my?tab=follow">
          <MenuItemContainer>팔로잉</MenuItemContainer>
        </Link>
      </MenuContainer>
    </>
  );
};

export default SideMenu;
