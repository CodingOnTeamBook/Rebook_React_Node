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

//selectbox 값에 따라서 endpoint 다르게 해서 api 호출
//loading, error 부분은 return을 다르게 하기
//select 되는 부분은 ref로 값 가져오기
//페이지네이션 해야하니까 여기서 값을 넘기는게 좋을 것 같음.
//person 부분도 사용자 수정 부분은 없으니까 props로 넘기기

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
