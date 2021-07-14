import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from '../../components/common/GridItem';
import GridSmallItem from '../../components/common/GridSmallItem';
import SearchForm from '../../components/SearchForm';
import GreenCheckBox from '../../components/common/GreenCheckboxAndLabel';
import Person from '../../components/PeopleComponent/Person';
import BookInfo from '../../components/common/BookInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  margin: 2rem;
`;

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const NoResultMsg = styled.h2`
  margin: 0 auto;
  margin-top: 10rem;
`;

const SearchPage: FunctionComponent = () => {
  // const dispatch = useDispatch();

  const [typeA, setTypeA] = useState<boolean>(true);
  const [typeB, setTypeB] = useState<boolean>(false);

  const [searchResult, setSearchResult] = useState<any[]>(['']);
  const location = useLocation();
  const query = location.search.split('=')[1];

  const { item, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    if (typeA) {
      setTypeB(false);
    }
    if (typeB) {
      setTypeA(false);
    }
  }, [typeA, typeB]);

  useEffect(() => {
    item && setSearchResult(item);
    return () => {
      setSearchResult(['']);
    };
  }, [item]);

  console.log(searchResult);

  return (
    <Container>
      <SearchForm query={query} />
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
            {searchResult.length !== 0 ? (
              searchResult.map((result: any, index: number) => {
                return (
                  <GridSmallItem key={index}>
                    <BookInfo
                      imgUrl={result.url}
                      title={result.title}
                      author={result.author}
                    />
                  </GridSmallItem>
                );
              })
            ) : (
              <NoResultMsg>{query} 검색 결과가 없어요😅</NoResultMsg>
            )}
          </>
        )}
      </GridLayout>
    </Container>
  );
};

export default SearchPage;
