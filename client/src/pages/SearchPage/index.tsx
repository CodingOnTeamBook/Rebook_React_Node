import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from '../../components/common/GridItem';
import GridSmallItem from '../../components/common/GridSmallItem';
import SearchForm from '../../components/SearchForm';
import GreenCheckBox from '../../components/common/GreenCheckboxAndLabel';
import Person from '../../components/PeopleComponent/Person';
import BookInfo from '../../components/common/BookInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import axios from 'axios';
import { getSearchResult } from '../../redux/search/action';

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
  const [searchResult, setSearchResult] = useState<any>([]);
  const keyword = useSelector((state: RootState) => state.search.keyword);

  useEffect(() => {
    if (typeA) {
      setTypeB(false);
    }
    if (typeB) {
      setTypeA(false);
    }
  }, [typeA, typeB]);

  useEffect(() => {
    axios.get(`api/book/search?title=${keyword}`).then(
      ({
        data: {
          books: { item },
        },
      }) => setSearchResult(item)
    );
  }, [keyword]);

  console.log(searchResult);

  return (
    <Container>
      <SearchForm />
      <BtnArea>
        <GreenCheckBox
          labelName="책 찾기"
          defaultValue={typeA}
          submitValue={setTypeA}
        />
        <GreenCheckBox
          labelName="리뷰어 찾기"
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
            {searchResult.map((result: any, index: number) => {
              return (
                <GridSmallItem key={index}>
                  <BookInfo props={result} />
                </GridSmallItem>
              );
            })}
          </>
        )}
      </GridLayout>
    </Container>
  );
};

export default SearchPage;
