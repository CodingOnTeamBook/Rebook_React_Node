import React from 'react';
import Logo from '../../style/img/logo.png';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';

const LogoContainer = styled.img`
  width: 150px;
`;

const HeaderContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  box-shadow: 2px 2px rgba(40, 40, 40, 0.08);
  display: relative;
`;

function Header() {
  return (
    <HeaderContainer>
      <LogoContainer src={Logo} />
      <LineGreenBtn>로그인</LineGreenBtn>
    </HeaderContainer>
  );
}

export default Header;
