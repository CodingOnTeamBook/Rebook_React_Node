import React, { FunctionComponent } from 'react';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_API_KEY } from '../../config';
import styled from 'styled-components';

const KakaoLoginBtn: FunctionComponent = () => {
  return (
    <KakaoLogin
      token={`${KAKAO_API_KEY}`}
      onSuccess={() => console.log}
      onFail={() => console.log}
      onLogout={console.info}
    />
  );
};

export default KakaoLoginBtn;
