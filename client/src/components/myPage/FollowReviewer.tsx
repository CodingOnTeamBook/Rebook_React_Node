import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Reviewer from './Reviewer';
import GridLayout from '../common/GridLayout';
import GridItem from '../common/GridItem';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
  position: relative;
  h2 {
    margin-left: 2.5rem;
  }
`;

const SettingBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 5%;
  color: #afafaf;
`;

const FollowReviewer = () => {
  return (
    <Container>
      <h2>팔로잉</h2>
      <SettingBtn>
        <DeleteIcon />
        삭제
      </SettingBtn>
      <GridLayout>
        <>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
          <GridItem>
            <Reviewer />
          </GridItem>
        </>
      </GridLayout>
    </Container>
  );
};

export default FollowReviewer;
