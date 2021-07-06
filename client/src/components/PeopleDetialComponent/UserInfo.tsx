import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const UserInfoContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

const UserInfoWrapper = styled(Box)`
  padding: 20px;
  width: 100%;
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

const UserInfo: FunctionComponent = () => {
  return (
    <UserInfoContainer>
      <Paper variant="outlined">
        <UserInfoWrapper display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <UserImg
              alt="nickname"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQqLXPdwanG-kTsMGmC6Ff4lmKkw1LBy4G4G1tYxDNWV-8MCAI&usqp=CAU"
            />
            <Box display="flex" flexDirection="column">
              <UserName> User Name </UserName>
              <span>
                <UserNum>리뷰수 {22}</UserNum>
                <UserNum>팔로우 {22}</UserNum>
                <UserNum>팔로잉 {22}</UserNum>
              </span>
              <FollowButton variant="contained">팔로우</FollowButton>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <TagChip label="#태그" />
            <TagChip label="#태그" />
            <TagChip label="#태그" />
          </Box>
          <Introduction>
            자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
            자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
            자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
            자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
            자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
          </Introduction>
        </UserInfoWrapper>
      </Paper>
    </UserInfoContainer>
  );
};

export default UserInfo;
