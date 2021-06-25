import React, { FunctionComponent } from 'react';
import Person from '../../components/PeopleComponent/Person';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import SelectGenreTag from '../../components/PeopleComponent/SelectGenreTag';
import { genreTags } from '../../components/defaultData/genre';

const PeopleContainer = styled.div`
  margin-top: 30px;
  flex-grow: 1;
`;

const SelectButtonArea = styled.div`
  text-align: center;
`;

const PeoplePage: FunctionComponent = () => {
  return (
    <PeopleContainer>
      <SelectButtonArea>
        <SelectGenreTag tags={genreTags}></SelectGenreTag>
      </SelectButtonArea>
      <Grid container spacing={3}>
        <Person />
        <Person />
        <Person />
      </Grid>
    </PeopleContainer>
  );
};

export default PeoplePage;
