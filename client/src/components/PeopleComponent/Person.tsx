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
  border-radius: 16px;
  padding: 1rem;
  margin: 0.4rem;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

const NickName = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const TagArea = styled.div`
  div {
    margin: 0.5rem;
    font-size: 9px;
  }
`;

const Introduction = styled.div`
  margin: 0.7rem;
  font-size: 10px;
  padding: 0 3rem;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const ReviewArea = styled.div`
  width: 40%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const FollowerArea = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const Info = styled.span`
  margin-left: 0.5rem;
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
          <Chip label="#태그" size="small" />
          <Chip label="#태그" size="small" />
          <Chip label="#태그" size="small" />
        </TagArea>
        <Introduction>
          안녕하세요. 반갑습니다! 안녕하세요. 반갑습니다! 안녕하세요.
          안녕하세요. 반갑습니다!
        </Introduction>
        <DetailInfo>
          <ReviewArea>
            <ListAlt style={{ fontSize: '17px' }} />
            <Info> 2개 </Info>
          </ReviewArea>
          <FollowerArea>
            <PersonAdd style={{ fontSize: '17px' }} />
            <Info> 3명 </Info>
          </FollowerArea>
        </DetailInfo>
      </PaperContainer>
    </>
  );
};

export default Person;
