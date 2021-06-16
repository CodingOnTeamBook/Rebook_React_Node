import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import { Link } from 'react-router-dom';
import { FetchUserLogout } from '../../hooks/USER_API';

const ProfileContainer = styled.div`
  width: 205px;
  height: 335px;
  box-shadow: 4px 4px rgba(8, 8, 8, 0.15);
  border-radius: 25px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  right: 2rem;
  top: 5rem;
  background-color: ${(props) => props.theme.palette.darkgreen};
  h5 {
    margin: 0.7rem;
  }
  &:after {
    border-top: 0px solid transparent;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 11px solid ${(props) => props.theme.palette.darkgreen};
    content: '';
    position: absolute;
    top: -10px;
    right: 22px;
  }
`;

const ProfileImg = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ModalButton = styled(LineGreenBtn)`
  width: 150px;
  height: 40px;
  margin: 0.4rem;
  color: ${(props) => props.theme.palette.white};
`;

interface ProfileModalProps {
  imgUrl: string;
  nickname: string;
}

const ProfileModal: FunctionComponent<ProfileModalProps> = ({
  imgUrl,
  nickname,
}: ProfileModalProps) => {
  const Logout = () => {
    FetchUserLogout(1784652).then((data) => {
      if (!data.success) {
        alert('로그아웃을 다시 시도해주세요.');
      }
      localStorage.clear();
      alert('로그아웃이 완료되었습니다.');
      location.href = '/';
    });
  };
  return (
    <ProfileContainer>
      <ProfileImg src={imgUrl} alt="profileImg" />
      <h5>{nickname}</h5>
      <Link to="/my">
        <ModalButton>마이페이지</ModalButton>
      </Link>
      <ModalButton onClick={Logout}>로그아웃</ModalButton>
    </ProfileContainer>
  );
};

export default ProfileModal;