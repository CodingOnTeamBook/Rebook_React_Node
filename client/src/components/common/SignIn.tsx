import React, { FC, useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../style/img/logo.png';
import LoginImg from '../../style/img/loginImg.jpg';
import Modal from '@material-ui/core/Modal';

const LogoContainer = styled.img`
  padding-top: 10px;
  width: 200px;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #141414;
`;

const KaKaoBtn = styled.button`
  padding: 0;
  width: 250px;
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

const Btn = styled.button`
  padding: 0;
  width: 250px;
  height: 45px;
  line-height: 44px;
  color: ${(props) => props.theme.palette.black};
  background-color: ${(props) => props.theme.palette.green};
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

const Margin = styled.div`
  margin-top: 5px;
`;

interface Props {
  show: boolean;
}

function Login({ show }: Props) {
  if (!show) {
    return null;
  }

  return (
    <Modal open={show}>
      <LoginContainer>
        <ModalWrapper>
          <ModalImg src={LoginImg} alt="book" />
          <ModalContent>
            <LogoContainer src={Logo}></LogoContainer>
            <h2> 환영합니다! </h2>
            <h3> 가입하지 않으셨나요? </h3>
            <Link to="/SignupPage">
              <Btn>회원가입</Btn>
            </Link>
            <Margin></Margin>
            <h3>가입 하셨나요?</h3>
            <KaKaoBtn>Login with Kakao</KaKaoBtn>
          </ModalContent>
        </ModalWrapper>
      </LoginContainer>
    </Modal>
  );
}

export default Login;
