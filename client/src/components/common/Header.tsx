import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthThunk } from '../../modules/index';
import { RootState } from '../../modules/rootReducer';
import Logo from '../../style/img/logo.png';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { modalOpen } from 'modules';

const LogoContainer = styled.img`
  width: 200px;
  cursor: pointer;
`;

const Container = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
  const [isProfileModalOpen, setIsProfileModal] = useState<boolean>(false);
  const Location = useLocation();
  const ProfileModalToggle = () => {
    setIsProfileModal((prev) => !prev);
  };
  const CloseProfileModal = () => {
    setIsProfileModal(false);
  };
  const { loading, data, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loading && !data && !error) {
      dispatch(getAuthThunk());
    }
  }, [data, error]);
  useEffect(() => {
    CloseProfileModal();
  }, [Location]);
  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <LogoContainer src={Logo} />
        </Link>
        {data?.isAuth ? (
          <ProfileIcon onClick={() => ProfileModalToggle()} />
        ) : (
          <LoginBtn onClick={() => dispatch(modalOpen())}>로그인</LoginBtn>
        )}
      </HeaderContainer>
      <MenuContainer>
        <li>
          <Link to="/review">리뷰</Link>
        </li>
        <li>
          <Link to="/people">리뷰어</Link>
        </li>
      </MenuContainer>
      <ProfileModal
        state={isProfileModalOpen}
        imgUrl="https://cdn.pixabay.com/photo/2021/05/17/01/39/iris-6259565_960_720.jpg"
        nickname="리북이"
      />
    </Container>
  );
};

export default Header;
