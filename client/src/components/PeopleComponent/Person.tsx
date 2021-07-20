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
  /* border: 5px solid #000; */
  padding: 10px;
  width: 90px;
  height: 90px;
`;

const NickName = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const GenreTagWrapper = styled.div`
  margin-top: 10px;
  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const TagChip = styled(Chip)`
  background-color: ${(props) => props.theme.palette.green};
`;

const Introduction = styled.div`
  margin-top: 20px;
`;

const InfoContainer = styled(Box)`
  width: 100%;
  margin-top: 20px;
`;

const InfoWrapper = styled(Box)`
  width: 100%;
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
  genres: any;
}

interface IGenreTagsType {
  [key: number]: string;
}

const genreTags: IGenreTagsType = {
  0: '소설',
  1: '인문학',
  2: '사회과학',
  3: '역사',
  4: '과학',
  5: '예술',
  6: '종교',
};

const Person: FunctionComponent<IPersonProps> = ({
  nickname,
  profileImg,
  info,
  countFollowers,
  countUserReview,
  genres,
}: IPersonProps) => {
  const history = useHistory();

  const genreToArr = (genre: any) => {
    const genreNumArr = genre.split(',').map(Number);
    return genreNumArr;
  };

  return (
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
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {genreToArr(genres).map((genre: any) => (
            <GenreTagWrapper key={genre}>
              <TagChip label={genreTags[genre]} />
            </GenreTagWrapper>
          ))}
        </Box>
        <Introduction> {myInfo(info)} </Introduction>
        <InfoContainer display="flex" flexDirection="row">
          <InfoWrapper
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ListAlt></ListAlt>
            <Info> {countUserReview}개 </Info>
          </InfoWrapper>
          <InfoWrapper
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <PersonAdd></PersonAdd>
            <Info> {countFollowers}명 </Info>
          </InfoWrapper>
        </InfoContainer>
      </PersonContainer>
    </GridItem>
  );
};

export default Person;
