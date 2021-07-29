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
`;

const PersonWrapper = styled.div`
  border-radius: 10px 10px 0 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100000px 100000px;
  height: 150px;
  width: 100%;
`;

const UserImg = styled(Avatar)`
  margin-top: -80px;
  border-radius: 50%;
  border: 0.3rem solid white;
  width: 120px;
  height: 120px;
  background-color: white;
`;

const NickName = styled.div`
  margin-top: 5px;
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

const IntroductionContainer = styled(Box)`
  padding: 0 10% 0 10%;
  width: 100%;
  margin-top: 10px;
`;

const Introduction = styled.div`
  text-align: center;
  padding: 15px;
  border-radius: 20px;
  background-color: #f5f5f5;
`;

const InfoWrapper = styled(Box)`
  margin-top: 10px;
  width: 100%;
  margin-bottom: 20px;
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
      <PersonWrapper style={{ backgroundImage: `url(${profileImg})` }} />
      <UserImg alt={nickname} src={myProfileImg(profileImg)} />
      <NickName>{nickname}</NickName>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {genreToStr(genres).map((genre: any) => (
          <GenreTagWrapper key={genre}>
            <GenreChip label={`#${genreTags[genre]}`} />
          </GenreTagWrapper>
        ))}
      </Box>
      <IntroductionContainer>
        <Introduction> {myInfo(info)} </Introduction>
      </IntroductionContainer>
      <InfoWrapper display="flex" justifyContent="center" alignItems="center">
        <ListAlt></ListAlt>
        <ReviewCount> {countUserReview}개 </ReviewCount>
      </InfoWrapper>
    </PersonContainer>
  );
};

export default Person;
