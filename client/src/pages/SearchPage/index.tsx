import React, { FunctionComponent, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from '../../components/common/GridItem';
import GridSmallItem from '../../components/common/GridSmallItem';
import SearchForm from '../../components/SearchForm';
import GreenCheckBox from '../../components/common/GreenCheckboxAndLabel';
import Person from '../../components/PeopleComponent/Person';
import BookInfo from '../../components/common/BookInfo';

const Container = styled.div`
  margin: 2rem;
`;

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SearchPage: FunctionComponent = () => {
  const [typeA, setTypeA] = useState<boolean>(true);
  const [typeB, setTypeB] = useState<boolean>(false);
  const location: any = useLocation();
  const [inputValue, setInputValue] = useState(location.state.inputValue);
  const [bookResult, setBookResult] = useState(location.state.item);
  console.log(inputValue, bookResult);

  useEffect(() => {
    if (typeA) {
      setTypeB(false);
    }
    if (typeB) {
      setTypeA(false);
    }
  }, [typeA, typeB]);
  return (
    <Container>
      <SearchForm />
      <BtnArea>
        <GreenCheckBox
          labelName="책 이름으로 찾기"
          defaultValue={typeA}
          submitValue={setTypeA}
        />
        <GreenCheckBox
          labelName="유저 이름으로 찾기"
          defaultValue={typeB}
          submitValue={setTypeB}
        />
      </BtnArea>
      <GridLayout>
        {typeB ? (
          <>
            <GridItem>
              <Person />
            </GridItem>
            <GridItem>
              <Person />
            </GridItem>
          </>
        ) : (
          <>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
            <GridSmallItem>
              <BookInfo />
            </GridSmallItem>
          </>
        )}
      </GridLayout>
    </Container>
  );
};

export default SearchPage;
