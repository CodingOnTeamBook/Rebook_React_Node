import React, { FunctionComponent } from 'react';
import Person from '../../components/PeopleComponent/Person';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import SelectTag from '../../components/PeopleComponent/SelectTag';
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
        <SelectTag tags={genreTags}></SelectTag>
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
