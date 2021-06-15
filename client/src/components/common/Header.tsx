import React, { FunctionComponent, useState } from 'react';
import Logo from '../../style/img/logo.png';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import ProfileModal from './ProfileModal';

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

const LoginBtn = styled(LineGreenBtn)`
  position: absolute;
  right: 2rem;
`;

const ProfileIcon = styled(AccountCircleIcon)`
  color: ${(props) => props.theme.palette.green};
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  position: absolute;
  right: 2.5rem;
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

const Header: FunctionComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const ProfileModalToggle = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <LogoContainer src={Logo} />
        </Link>
        {isLogin ? (
          <ProfileIcon onClick={ProfileModalToggle} />
        ) : (
          <LoginBtn>로그인</LoginBtn>
        )}
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
      {isProfileModalOpen && (
        <ProfileModal
          imgUrl="https://cdn.pixabay.com/photo/2021/05/17/01/39/iris-6259565_960_720.jpg"
          nickname="리북이"
        />
      )}
    </Container>
  );
};

export default Header;
