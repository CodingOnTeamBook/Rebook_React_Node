import React, { FunctionComponent } from 'react';
import Person from '../../components/PeopleComponent/Person';
import styled from 'styled-components';
import SelectGenreTag from '../../components/PeopleComponent/SelectGenreTag';
import { genreTags } from '../../components/defaultData/genre';
import GridLayout from '../../components/common/GridLayout';
import GridItem from '../../components/common/GridItem';

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
      <GridLayout>
        <GridItem>
          <Person />
        </GridItem>
        {/* 이렇게 가져와야해서 데이터 받아왔을 때 효율성 떨어지면 GridItem은 제거하도록 하겠습니다. */}
        {/* <GridItem>
          <Person />
        </GridItem> */}
      </GridLayout>
    </PeopleContainer>
  );
};

export default PeoplePage;
