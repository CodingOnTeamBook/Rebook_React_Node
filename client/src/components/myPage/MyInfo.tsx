import React from 'react';
import styled from 'styled-components';
import CheckboxesGroup from '../CheckBoxGroupComponent';
import { genreTags } from '../defaultData/genre';
import { LineGreenBtn, ProfileImg } from '../../style/componentStyled';
import {
  myGender,
  myAgeRange,
  myInfo,
  myProfileImg,
} from '../../globalFunction/myInfoDefaultValue';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 90%;
  height: 100%;
`;

const MainInfo = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
`;

const DisabledArea = styled.div`
  margin-left: 2.5rem;
  width: 35%;
`;

const DisabledInfoArea = styled.div`
  display: flex;
  align-items: center;
  margin: 0.4rem 0;
  justify-content: space-between;
  label {
    line-height: 1.1;
    font-size: 1rem;
    margin-right: 1rem;
  }
  input {
    border-radius: 4px;
    background-color: ${(props) => props.theme.palette.gray};
    border: none;
    font-size: 0.9rem;
    padding: 0.4rem;
    text-align: center;
  }
`;

const GenreContainer = styled.div`
  border: 2px solid ${(props) => props.theme.palette.green};
  border-radius: 16px;
  padding: 1rem;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 2px solid ${(props) => props.theme.palette.green};
  width: 65%;
  border-radius: 16px;
  min-height: 100px;
  overflow-y: auto;
  margin-bottom: 2rem;
  padding: 1rem;
`;

const MyProfileImg = styled(ProfileImg)`
  padding: 0.2rem;
  border: 2px solid ${(props) => props.theme.palette.green};
`;

const Title = styled.h1`
  line-height: 1.4;
`;

const SubTitle = styled.h2`
  margin: 0;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const MyInfo = () => {
  // 테스트 데이터
  const USER_DATA = [
    {
      id: 2,
      userId: '1234',
      nickname: '리북이',
      genres: '',
      gender: 'Secret',
      ageRange: '20대',
      profileImg: 'defaultImg',
      info: '안녕하세용~~☺',
      createdAt: '2021-06-28T08:39:00.108Z',
      updatedAt: '2021-06-28T08:39:00.162Z',
    },
  ];

  const imgUrl =
    'https://cdn.pixabay.com/photo/2021/05/17/01/39/iris-6259565_960_720.jpg';

  return (
    <>
      {USER_DATA.map((user) => (
        <Container key={user.id}>
          <Title>내 정보</Title>
          <MainInfo key={user.id}>
            <MyProfileImg src={myProfileImg(user.profileImg)} />
            <DisabledArea>
              <DisabledInfoArea>
                <label>닉네임</label>
                <input value={user.nickname} disabled />
              </DisabledInfoArea>
              <DisabledInfoArea>
                <label>성별</label>
                <input value={myGender(user.gender)} disabled />
              </DisabledInfoArea>
              <DisabledInfoArea>
                <label>나이</label>
                <input value={myAgeRange(user.ageRange)} disabled />
              </DisabledInfoArea>
            </DisabledArea>
          </MainInfo>
          <SubTitle>선호하는 장르를 알려주세요</SubTitle>
          <GenreContainer>
            <CheckboxesGroup tags={genreTags} />
          </GenreContainer>
          <SubTitle>자기 소개</SubTitle>
          <TextArea placeholder={myInfo(user.info)} />
          <LineGreenBtn>수정하기</LineGreenBtn>
        </Container>
      ))}
    </>
  );
};

export default MyInfo;
