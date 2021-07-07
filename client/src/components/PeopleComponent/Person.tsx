import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ListAlt from '@material-ui/icons/ListAlt';
import PersonAdd from '@material-ui/icons/PersonAdd';

const PaperContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  padding: 25px;
`;

const UserImg = styled(Avatar)`
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

const Person: FunctionComponent = () => {
  const id = 'test';
  const history = useHistory();

  return (
    <>
      <PaperContainer
        square
        onClick={() => {
          history.push(`/people/${id}`);
        }}
      >
        <UserImg
          alt="nickname"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQqLXPdwanG-kTsMGmC6Ff4lmKkw1LBy4G4G1tYxDNWV-8MCAI&usqp=CAU"
        />
        <NickName>리북이</NickName>
        <TagArea>
          <TagChip label="#태그" /> <TagChip label="#태그" />
          <TagChip label="#태그" />
        </TagArea>
        <Introduction>
          안녕하세요. 반갑습니다! 안녕하세요. 반갑습니다! 안녕하세요.
          안녕하세요. 반갑습니다!
        </Introduction>
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
      </PaperContainer>
    </>
  );
};

export default Person;
