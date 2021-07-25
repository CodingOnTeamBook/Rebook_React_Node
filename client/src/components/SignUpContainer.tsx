import React, { FunctionComponent, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../style/componentStyled';
import CheckboxesGroup from './CheckBoxGroupComponent';
import UserNameForm from './UserNameFormComponent';
import { genreTags } from './defaultData/genre';
import { useLocation } from 'react-router-dom';
import { Signup } from '../API/USER_PRIVATE_API';

const SubTitle = styled.h2`
  margin: 48px;
`;

const TagsContainer = styled.div`
  height: auto;
  padding: 2rem;
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
  const location: any = useLocation();
  const Info = location.state;
  const ChildRef = useRef<HTMLDivElement | any>(null);
  const ChildBoxRef = useRef<HTMLDivElement | any>(null);
  // userNameForm 관련
  const callChildFunc = () => {
    const Data = { ...Info, genre: '', nickName: '' };
    Data.nickName = ChildRef.current.getInputData();
    Data.genre = ChildBoxRef.current.getCheckData();
    if (Data.genres == '') {
      alert('장르를 한 개 이상 선택해주세요.');
      return false;
    }
    if (Data.nickName == undefined) {
      alert('닉네임을 입력 후 중복확인을 완료해주세요.');
      return false;
    }
    Signup(Data).then((response) => {
      if (!response.success) {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
        window.location.href = '/';
      }
    });
  };
  return (
    <>
      <SubTitle>선호하는 장르를 알려주세요</SubTitle>
      <TagsContainer>
        <CheckboxesGroup tags={genreTags} ref={ChildBoxRef} />
      </TagsContainer>
      <SubTitle>사용할 닉네임을 입력해주세요</SubTitle>
      <UserNameForm ref={ChildRef} />
      <SignUpBtn onClick={callChildFunc}>회원가입</SignUpBtn>
    </>
  );
};

export default SignUpContainer;
