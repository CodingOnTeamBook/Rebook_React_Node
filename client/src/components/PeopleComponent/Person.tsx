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
import { IReviewer } from '../../API/REVIEWER_PUBLIC_API/reviewer.interface';

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

interface IProps {
  reviewer?: Array<IReviewer>;
}

const Person: FunctionComponent<IProps> = ({ reviewer }: IProps) => {
  console.log(reviewer);
  const genresArr = reviewer?.map(({ genres }) => genres);
  console.log(genresArr);

  const id = 'test';
  const history = useHistory();

  return (
    <>
      {reviewer?.map((user: any, index: number) => (
        <GridItem key={user.id}>
          <PersonContainer
            display="flex"
            flexDirection="column"
            alignItems="center"
            boxShadow={2}
            onClick={() => {
              history.push(`/people/${user.id}`);
            }}
          >
            <UserImg alt={user.nickname} src={myProfileImg(user.profileImg)} />
            <NickName>{user.nickname}</NickName>
            <TagArea>
              {user.genres.split(',').map((tag: any, index: number) => (
                <TagChip key={index} label={tag} />
              ))}
            </TagArea>
            <Introduction>
              {myInfo(user.info === null ? 'defaultInfo' : user.info)}
            </Introduction>
            <DetailInfo>
              <ReviewArea>
                <ListAlt></ListAlt>
                <Info> {user.countUserReviews}개 </Info>
              </ReviewArea>
              <FollowerArea>
                <PersonAdd></PersonAdd>
                <Info> {user.countFollowers}명 </Info>
              </FollowerArea>
            </DetailInfo>
          </PersonContainer>
        </GridItem>
      ))}
    </>
  );
};

export default Person;
