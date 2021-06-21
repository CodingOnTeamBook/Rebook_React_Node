import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../style/componentStyled';
import CheckboxesGroup from './CheckBoxGroupComponent';
import UserNameForm from './UserNameFormComponent';
import { genreTags } from './defaultData/genre';

const SubTitle = styled.h2`
  margin: 48px;
`;

const TagsContainer = styled.div`
  height: 30vh;
  margin: 0 auto;
  border-radius: 25px;
  box-shadow: 0 10px 20px ${(props) => props.theme.palette.gray},
    0 6px 6px ${(props) => props.theme.palette.gray};
`;

const SignUpBtn = styled(LineGreenBtn)`
  position: static;
  width: 20vw;
  margin: 0 auto;
  margin-top: 4rem;
`;

const SignUpContainer: FunctionComponent = () => {
  const ChildRef = useRef<HTMLDivElement | any>(null);
  const ChildBoxRef = useRef<HTMLDivElement | any>(null);
  // userNameForm 관련
  const callChildFunc = () => {
    ChildRef.current && console.log(ChildRef.current.getInputData());
    ChildBoxRef.current && console.log(ChildBoxRef.current.getCheckData());
  };
  return (
    <>
      <SubTitle>선호하는 장르를 알려주세요</SubTitle>
      <TagsContainer>
        <CheckboxesGroup tags={genreTags} ref={ChildBoxRef} />
      </TagsContainer>
      <SubTitle>사용할 닉네임을 입력해주세요</SubTitle>
      <UserNameForm ref={ChildRef} />
      <SignUpBtn onClick={() => callChildFunc}>회원가입</SignUpBtn>
    </>
  );
};

export default SignUpContainer;
