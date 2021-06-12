import React from 'react';
import styled from 'styled-components';
import Logo from '../../style/img/logo.png';
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
  width: 400px;
  height: 250px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  display: grid;
  z-index: 10;
  border-radius: 10px;
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
  width: 80%;
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
          <ModalContent>
            <LogoContainer src={Logo}></LogoContainer>
            <h3>로그인</h3>
            <KaKaoBtn>Login with Kakao</KaKaoBtn>
          </ModalContent>
        </ModalWrapper>
      </LoginContainer>
    </Modal>
  );
}

export default Login;
