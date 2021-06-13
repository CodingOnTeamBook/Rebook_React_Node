import React from 'react';
import styled from 'styled-components';
import SignUpContainer from '../../components/SignUpContainer';

/* styled components*/

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120vh;
  margin: 15vh auto;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
`;

/* SignUpPage*/

function SignupPage() {
  return (
    <MainContainer>
      <Title>🎉가입을 환영합니다🎉</Title>
      <SignUpContainer />
    </MainContainer>
  );
}

export default SignupPage;
