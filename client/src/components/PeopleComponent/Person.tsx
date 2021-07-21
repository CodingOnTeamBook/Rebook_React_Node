import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ListAlt from '@material-ui/icons/ListAlt';
import PersonAdd from '@material-ui/icons/PersonAdd';
import GridItem from '../common/GridItem';
import { myInfo, myProfileImg } from '../../globalFunction/myInfoDefaultValue';

const PersonContainer = styled(Box)`
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  padding: 10%;
`;

const UserImg = styled(Avatar)`
  border: 5px solid #000;
  padding: 10px;
  width: 90px;
  height: 90px;
`;

const NickName = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const TagArea = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const TagChip = styled(Chip)`
  &:not(:first-of-type) {
    margin-left: 10px;
  }
  background-color: ${(props) => props.theme.palette.green};
`;

const Introduction = styled.div`
  margin-top: 20px;
`;

const DetailInfo = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const ReviewArea = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FollowerArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.span`
  margin-left: 10px;
`;

const Person = () => {
  const history = useHistory();

  // 테스트 데이터
  const USER_DATA = [
    {
      id: 1,
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
    {
      id: 2,
      userId: '1234',
      nickname: '리자몽',
      genres: '',
      gender: 'Secret',
      ageRange: '20대',
      profileImg: 'defaultImg',
      info: '안녕하세용~~☺',
      createdAt: '2021-06-28T08:39:00.108Z',
      updatedAt: '2021-06-28T08:39:00.162Z',
    },
    {
      id: 3,
      userId: '1234',
      nickname: '꼬부기',
      genres: '',
      gender: 'Secret',
      ageRange: '20대',
      profileImg: 'defaultImg',
      info: '안녕하세용 나는 꼬부기~',
      createdAt: '2021-06-28T08:39:00.108Z',
      updatedAt: '2021-06-28T08:39:00.162Z',
    },
    {
      id: 4,
      userId: '1234',
      nickname: '어니부기',
      genres: '',
      gender: 'Secret',
      ageRange: 'Secret',
      profileImg: 'defaultImg',
      info: 'defaultInfo',
      createdAt: '2021-06-28T08:39:00.108Z',
      updatedAt: '2021-06-28T08:39:00.162Z',
    },
  ];
  const id = 'test';
  return (
    <>
      {USER_DATA.map((user) => (
        <GridItem key={user.id}>
          <PersonContainer
            display="flex"
            flexDirection="column"
            alignItems="center"
            boxShadow={2}
            key={user.id}
            onClick={() => {
              history.push(`/people/${id}`);
            }}
          >
            <UserImg alt={user.nickname} src={myProfileImg(user.profileImg)} />
            <NickName>{user.nickname}</NickName>
            <TagArea>
              <TagChip label="#태그" /> <TagChip label="#태그" />
              <TagChip label="#태그" />
            </TagArea>
            <Introduction> {myInfo(user.info)} </Introduction>
            <DetailInfo>
              <ReviewArea>
                <ListAlt></ListAlt>
                <Info> 2개 </Info>
              </ReviewArea>
              <FollowerArea>
                <PersonAdd></PersonAdd>
                <Info> 3명 </Info>
              </FollowerArea>
            </DetailInfo>
          </PersonContainer>
        </GridItem>
      ))}
    </>
  );
};

export default Person;
