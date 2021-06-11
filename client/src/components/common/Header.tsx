import React from 'react';
import Logo from '../../style/img/logo.png';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import { Link } from 'react-router-dom';

const LogoContainer = styled.img`
  width: 150px;
  cursor: pointer;
`;

const Container = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  display: relative;
`;

const MenuContainer = styled.ul`
  width: 100%;
  display: flex;
  height: 2.5rem;
  box-shadow: 2px 2px rgba(40, 40, 40, 0.08);
  margin: 0;
  padding: 0;
  li {
    list-style: none;
    width: 100%;
    height: 100%;
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgba(40, 40, 40, 0.08);
      cursor: pointer;
    }
  }
`;

function Header() {
  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <LogoContainer src={Logo} />
        </Link>
        <LineGreenBtn>로그인</LineGreenBtn>
      </HeaderContainer>
      <MenuContainer>
        <li>
          <Link to="/recommend">추천 도서</Link>
        </li>
        <li>
          <Link to="/review">리뷰</Link>
        </li>
        <li>
          <Link to="/people">리뷰어</Link>
        </li>
      </MenuContainer>
    </Container>
  );
}

export default Header;
