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

const KaKaoBtn = styled.button`
  /* padding: 0; */
  /* width: 80%; */
  height: 45px;
  line-height: 44px;
  color: #000;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
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
