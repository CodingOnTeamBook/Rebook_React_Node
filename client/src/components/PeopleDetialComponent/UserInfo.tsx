import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const UserInfoContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

const UserInfoWrapper = styled(Box)`
  padding: 20px;
  width: 100%;
  border-radius: 10px;
`;
const UserImg = styled(Avatar)`
  width: 90px;
  height: 90px;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 20px;
`;

const UserNum = styled.span`
  font-size: 15px;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const GenreTagWrapper = styled.div`
  margin-top: 10px;
  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const TagChip = styled(Chip)`
  margin-top: 10px;
  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const Introduction = styled.span`
  background-color: #e2e2e2;
  padding: 20px;
  border-radius: 20px;
  margin-top: 10px;
  font-size: 15px;
`;

const FollowButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.palette.green};
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

interface IUserInfoProps {
  nickname: string;
  info: string;
  countUserReviews: number;
  profileImg: string;
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

const genreToArr = (genre: any) => {
  const genreNumArr = genre.split(',').map(Number);
  return genreNumArr;
};

const UserInfo: FunctionComponent<IUserInfoProps> = ({
  nickname,
  info,
  countUserReviews,
  profileImg,
  genres,
}: IUserInfoProps) => {
  return (
    <UserInfoContainer>
      <UserInfoWrapper display="flex" flexDirection="column" boxShadow={2}>
        <Box display="flex" flexDirection="row">
          <UserImg alt={nickname} src={profileImg} />
          <Box display="flex" flexDirection="column" flexWrap="wrap">
            <UserName> {nickname} </UserName>
            <span>
              <UserNum>리뷰수 {countUserReviews}개</UserNum>
            </span>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {genreToArr(genres).map((genre: any) => (
            <GenreTagWrapper key={genre}>
              <TagChip label={genreTags[genre]} />
            </GenreTagWrapper>
          ))}
        </Box>
        <Introduction> {info} </Introduction>
      </UserInfoWrapper>
    </UserInfoContainer>
  );
};

export default UserInfo;
