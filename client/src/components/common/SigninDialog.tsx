import React from 'react';
import styled from 'styled-components';
import Logo from '../../style/img/logo.png';
import { Dialog } from '@material-ui/core';

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

// 위치 확인 하려고 둔 버튼 입니다!
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

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

function SigninDialog({ isOpen, handleClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>
        <LogoContainer src={Logo}></LogoContainer>
        <h3>로그인</h3>
        <KaKaoBtn onClick={handleClose}>Login with Kakao</KaKaoBtn>
      </DialogContent>
    </Dialog>
  );
}

export default SigninDialog;
