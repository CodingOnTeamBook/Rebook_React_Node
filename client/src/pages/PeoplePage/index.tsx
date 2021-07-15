import React, { FunctionComponent } from 'react';
import Person from '../../components/PeopleComponent/Person';
import styled from 'styled-components';
import SelectGenreTag from '../../components/PeopleComponent/SelectGenreTag';
import { genreTags } from '../../components/defaultData/genre';
import GridLayout from '../../components/common/GridLayout';
import GridItem from '../../components/common/GridItem';

const PeopleContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
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
      <GridLayout>
        <Person />
      </GridLayout>
    </PeopleContainer>
  );
};

export default PeoplePage;
