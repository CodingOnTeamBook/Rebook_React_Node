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

const LogoContainer = styled.img<{ isMobile: boolean | null }>`
  width: ${(props) => (props.isMobile ? 130 : 200)}px;
  cursor: pointer;
`;

const Container = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const HeaderContainer = styled.div<{ isMobile: boolean | null }>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.isMobile ? 'space-between' : 'center')};
  padding: 1rem;
  padding-left: ${(props) => (props.isMobile ? 3 : 0)}rem;
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
  width: 80%;
  display: flex;
  height: 2.5rem;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ddd;

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
      color: ${(props) => props.theme.palette.yellow};
      cursor: pointer;
    }
  }
`;

const Header: FunctionComponent = () => {
  const [isProfileModalOpen, setIsProfileModal] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const Location = useLocation();
  const MOBILE_SIZE = 500;

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

  // Header Mobile 대응 추가
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    windowWidth < MOBILE_SIZE ? setIsMobile(true) : setIsMobile(false);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [windowWidth]);

  return (
    <Container>
      <HeaderContainer isMobile={isMobile}>
        <Link to="/">
          <LogoContainer isMobile={isMobile} src={Logo} />
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
      {data?.user && (
        <ProfileModal
          state={isProfileModalOpen}
          imgUrl={data.user.profileImg}
          nickname={data.user.nickname}
        />
      )}
    </Container>
  );
};

export default Header;
