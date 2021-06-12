import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../style/img/logo.png';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import SignIn from './SignIn';

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
  const [show, setShow] = useState(false);

  const popRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(
    ({ target }) => {
      if (popRef.current && !popRef.current.contains(target)) {
        setShow(false);
      }
    },
    [setShow]
  );

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const onClickToggleModal = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  return (
    <HeaderContainer ref={popRef}>
      <Link to="/">
        <LogoContainer src={Logo} />
      </Link>
      <LineGreenBtn onClick={onClickToggleModal}>로그인</LineGreenBtn>
      <SignIn show={show} />
    </HeaderContainer>
  );
}

export default Header;
