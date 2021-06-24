import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const PaperContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  padding: 25px;
`;

const UserImg = styled(Avatar)`
  width: 70px;
  height: 70px;
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
  margin-left: 10px;
`;

const Introduction = styled.div`
  margin-top: 20px;
`;

const Person: FunctionComponent = () => {
  return (
    <Grid item xs={4} zeroMinWidth>
      <PaperContainer>
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
      </PaperContainer>
    </Grid>
  );
};

export default Person;
