import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ListAlt from '@material-ui/icons/ListAlt';
import { myInfo, myProfileImg } from '../../globalFunction/myInfoDefaultValue';

const PersonContainer = styled(Box)`
  border-radius: 10px;
  width: 100%;
  padding: 10%;
`;

const UserImg = styled(Avatar)`
  /* border: 5px solid #000; */
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

const GenreChip = styled(Chip)`
  background-color: ${(props) => props.theme.palette.green};
`;

const Introduction = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  border-radius: 20px;
  background-color: #e2e2e2;
`;

const InfoWrapper = styled(Box)`
  margin-top: 20px;
  width: 100%;
`;

const ReviewCount = styled.span`
  margin-left: 5px;
`;

interface IPersonProps {
  nickname: string;
  profileImg: string;
  info: string;
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

const genreToStr = (genre: any) => {
  const genreNumArr = genre.split(',').map(Number);
  return genreNumArr;
};

const Person: FunctionComponent<IPersonProps> = ({
  nickname,
  profileImg,
  info,
  countUserReview,
  genres,
}: IPersonProps) => {
  return (
    <PersonContainer
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow={3}
    >
      <UserImg alt={nickname} src={myProfileImg(profileImg)} />
      <NickName>{nickname}</NickName>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {genreToStr(genres).map((genre: any) => (
          <GenreTagWrapper key={genre}>
            <GenreChip label={`#${genreTags[genre]}`} />
          </GenreTagWrapper>
        ))}
      </Box>
      <Introduction> {myInfo(info)} </Introduction>
      <InfoWrapper display="flex" justifyContent="center" alignItems="center">
        <ListAlt></ListAlt>
        <ReviewCount> {countUserReview}개 </ReviewCount>
      </InfoWrapper>
    </PersonContainer>
  );
};

export default Person;
