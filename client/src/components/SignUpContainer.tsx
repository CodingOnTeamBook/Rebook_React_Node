import React, { useState } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../style/componentStyled';
import CheckboxesGroup from './CheckBoxGroupComponent';
import UserNameFrom from './UserNameFormComponent';

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

function SignUpContainer() {
  const [checkedTags, setCheckedTags] = useState({
    소설: false,
    인문학: false,
    사회과학: false,
    역사: false,
    과학: false,
    예술: false,
    종교: false,
  });

  // Tags관련
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTags({
      ...checkedTags,
      [event.target.name]: event.target.checked,
    });
  };

  const { 소설, 인문학, 사회과학, 역사, 과학, 예술, 종교 } = checkedTags;

  const COUNT_OF_CHECKED = [
    소설,
    인문학,
    사회과학,
    역사,
    과학,
    예술,
    종교,
  ].filter((elem) => elem === true).length;

  const ERROR = COUNT_OF_CHECKED < 1 || COUNT_OF_CHECKED > 3;
  console.log(checkedTags, COUNT_OF_CHECKED);

  // userNameForm 관련
  const [userName, setUserName] = useState('');

  const changeUserName = (inputValue: string) => {
    setUserName(inputValue);
  };

  return (
    <>
      <SubTitle>선호하는 장르를 알려주세요</SubTitle>
      <TagsContainer>
        <CheckboxesGroup
          tags={checkedTags}
          handleChange={handleChange}
          error={ERROR}
        />
      </TagsContainer>
      <SubTitle>사용할 닉네임을 입력해주세요</SubTitle>
      <UserNameFrom handleChange={changeUserName} />
      <SignUpBtn onClick={() => console.log(userName, checkedTags)}>
        회원가입
      </SignUpBtn>
    </>
  );
}

export default SignUpContainer;
