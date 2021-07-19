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

interface IPersonProps {
  nickname: string;
  profileImg: string;
  info: string;
  countFollowers: number;
  countUserReview: number;
}

const Person: FunctionComponent<IPersonProps> = ({
  nickname,
  profileImg,
  info,
  countFollowers,
  countUserReview,
}: IPersonProps) => {
  const history = useHistory();
  return (
    <>
      <GridItem>
        <PersonContainer
          display="flex"
          flexDirection="column"
          alignItems="center"
          boxShadow={2}
          onClick={() => {
            history.push(`/people/${nickname}`);
          }}
        >
          <UserImg alt={nickname} src={myProfileImg(profileImg)} />
          <NickName>{nickname}</NickName>
          <TagArea>
            <TagChip label="#태그" /> <TagChip label="#태그" />
            <TagChip label="#태그" />
          </TagArea>
          <Introduction> {myInfo(info)} </Introduction>
          <DetailInfo>
            <ReviewArea>
              <ListAlt></ListAlt>
              <Info> {countUserReview} </Info>
            </ReviewArea>
            <FollowerArea>
              <PersonAdd></PersonAdd>
              <Info> {countFollowers} </Info>
            </FollowerArea>
          </DetailInfo>
        </PersonContainer>
      </GridItem>
    </>
  );
};

export default Person;
