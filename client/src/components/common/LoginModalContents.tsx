import React, { FunctionComponent } from 'react';
import KakaoLoginBtn from './KaKaoLoginBtn';
import styled from 'styled-components';
import Logo from '../../style/img/logo.png';

const LoginModalContainer = styled.div`
  position: relative;
  width: 400;
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.white};
  border-radius: 4px;
  top: 25%;
  left: 15%;
`;

const LogoContainer = styled.img`
  padding-top: 10px;
  width: 200px;
`;

const DialogContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #141414;
  height: 250px;
  width: 300px;
`;

const LoginModalContents: FunctionComponent = () => {
  return (
    <LoginModalContainer>
      <DialogContent>
        <LogoContainer src={Logo}></LogoContainer>
        <h3>로그인</h3>
        <KakaoLoginBtn />
      </DialogContent>
    </LoginModalContainer>
  );
};

export default LoginModalContents;
