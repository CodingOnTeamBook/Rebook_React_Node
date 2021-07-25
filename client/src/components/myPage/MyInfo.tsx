import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CheckboxesGroup from '../CheckBoxGroupComponent';
import { genreTags } from '../defaultData/genre';
import { LineGreenBtn, ProfileImg } from '../../style/componentStyled';
import {
  myGender,
  myAgeRange,
  myInfo,
  myProfileImg,
} from 'globalFunction/myInfoDefaultValue';
import { TransferCheckGenres } from 'globalFunction/TransferGenres';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/rootReducer';
import useInput from 'hooks/useInput';
import { ImgUpdate, update } from 'API/USER_PRIVATE_API';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  height: 100vh;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const DisabledArea = styled.div`
  margin-left: 2.5rem;
  width: %;
`;

const DisabledInfoArea = styled.div`
  display: flex;
  align-items: center;
  margin: 0.4rem 0;
  justify-content: space-between;
  cursor: default;
  label {
    line-height: 1.2;
    font-size: 9px;
    margin-right: 1rem;
  }
  input {
    border-radius: 4px;
    background-color: ${(props) => props.theme.palette.gray};
    border: none;
    font-size: 11px;
    padding: 0.4rem;
    text-align: center;
  }
`;

const GenreContainer = styled.div`
  border: 2px solid ${(props) => props.theme.palette.green};
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  width: 80%;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 2px solid ${(props) => props.theme.palette.green};
  width: 80%;
  border-radius: 16px;
  min-height: 150px;
  overflow-y: auto;
  margin-bottom: 2rem;
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;

const MyProfileImg = styled(ProfileImg)`
  padding: 0.2rem;
  width: 90px;
  height: 90px;
  border: 2px solid ${(props) => props.theme.palette.green};
  cursor: pointer;
`;

const Title = styled.h1`
  line-height: 1.2;
  font-size: 16px;
  cursor: default;
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  cursor: default;
`;

const MyInfo = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const ChildBoxRef = useRef<HTMLDivElement | any>(null);
  const { value, onChange, setInitialValue } = useInput({
    initialValue: data ? data.user.info : '',
  });

  const handleChangeFile = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const imageFile = event.currentTarget.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setImgFile(imageFile);
      setFileUrl(imageUrl);
    }
  };

  const onSubmit = () => {
    if (imgFile) {
      ImgUpdate(imgFile).then((response) => {
        if (!response.success) {
          alert('프로필 사진 저장에 실패했습니다. 다시 시도해주세요.');
        }
        const formData = {
          image: response.filePath,
          genre: ChildBoxRef.current.getCheckData(),
          info: value,
        };
        update(formData).then((response) => {
          if (response.success) {
            alert('성공적으로 수정되었습니다.');
          } else {
            alert('에러가 발생했습니다. 다시 시도해주세요.');
          }
        });
      });
    } else {
      const formData = {
        genre: ChildBoxRef.current.getCheckData(),
        info: value,
      };
      update(formData).then((response) => {
        if (response.success) {
          alert('성공적으로 수정되었습니다.');
        } else {
          alert('에러가 발생했습니다. 다시 시도해주세요.');
        }
      });
    }
  };
  if (data?.user)
    return (
      <>
        <Container>
          <Title>내 정보</Title>
          <MainInfo>
            <label htmlFor="imgFile">
              {fileUrl ? (
                <MyProfileImg src={fileUrl} />
              ) : (
                <MyProfileImg src={myProfileImg(data.user.profileImg)} />
              )}
            </label>
            <input
              type="file"
              name="profileImg"
              id="imgFile"
              accept="image/*"
              onChange={handleChangeFile}
              style={{ display: 'none' }}
            />
            <DisabledArea>
              <DisabledInfoArea>
                <label>닉네임</label>
                <input value={data.user.nickname} disabled />
              </DisabledInfoArea>
              <DisabledInfoArea>
                <label>성별</label>
                <input value={myGender(data.user.gender)} disabled />
              </DisabledInfoArea>
              <DisabledInfoArea>
                <label>나이</label>
                <input value={myAgeRange(data.user.ageRange)} disabled />
              </DisabledInfoArea>
            </DisabledArea>
          </MainInfo>
          <SubTitle>선호하는 장르를 알려주세요</SubTitle>
          <GenreContainer>
            <CheckboxesGroup
              tags={TransferCheckGenres(data.user.genres)}
              ref={ChildBoxRef}
            />
          </GenreContainer>
          <SubTitle>자기 소개</SubTitle>
          <TextArea
            placeholder={myInfo(data.user.info)}
            value={value}
            onChange={onChange}
          />
          <LineGreenBtn onClick={() => onSubmit()}>수정하기</LineGreenBtn>
        </Container>
      </>
    );
  return null;
};

export default MyInfo;
