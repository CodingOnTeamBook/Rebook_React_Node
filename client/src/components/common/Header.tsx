import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../style/img/logo.png';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import SigninDialog from '../common/SigninDialog';

const LogoContainer = styled.img`
  width: 200px;
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
  const [isSigninDialogOpen, setSigninDialogOpen] = useState(false);

  const dialogOpen = () => {
    setSigninDialogOpen(!isSigninDialogOpen);
  };

  const dialogClose = () => {
    setSigninDialogOpen(!isSigninDialogOpen);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoContainer src={Logo} />
      </Link>
      <LineGreenBtn onClick={dialogOpen}>로그인</LineGreenBtn>
      <SigninDialog isOpen={isSigninDialogOpen} handleClose={dialogClose} />
    </HeaderContainer>
  );
}

export default Header;
