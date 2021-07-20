import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from '../../components/common/GridItem';
import GridSmallItem from '../../components/common/GridSmallItem';
import SearchForm from '../../components/common/SearchForm';
import GreenCheckBox from '../../components/common/GreenCheckboxAndLabel';
import Person from '../../components/PeopleComponent/Person';
import BookInfo from '../../components/common/BookInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { fetchApi } from '../../redux/search/action';
import { setBookInfo } from '../../redux/book/action';

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

const TempContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [typeA, setTypeA] = useState<boolean>(true);
  const [typeB, setTypeB] = useState<boolean>(false);

  const [searchResult, setSearchResult] = useState<any[]>();
  const location = useLocation();
  const query = decodeURI(location.search.split('=')[1]);

  const { item, loading, error, msg } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    dispatch(fetchApi(query, 1));
  }, [location]);

  useEffect(() => {
    if (typeA) {
      setTypeB(false);
    }
    if (typeB) {
      setTypeA(false);
    }
  }, [typeA, typeB]);

  useEffect(() => {
    item && setSearchResult([...item]);
    return () => {
      setSearchResult(undefined);
    };
  }, [item]);

  const onClick = (index: number) => {
    const booksInfo = [...(searchResult as Array<any>)];

    // bookInfo에서 필요한 속성만 추출
    const {
      link,
      cover,
      title,
      author,
      publisher,
      pubDate,
      description,
      isbn,
    } = booksInfo[index];

    const bookData = {
      link,
      cover,
      title,
      author,
      publisher,
      pubDate,
      description,
      isbn,
    };

    // 해당 책 정보를 store에 dispatch
    dispatch(setBookInfo(bookData));

    history.push(`book/${isbn}`);
  };

  // people page 변경으로 충돌 발생하여서
  // test용 데이터를 만들었슴다...😂

  const test = 'test';
  const test2 = 1;

  const Header = () => {
    return (
      <>
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
      </>
    );
  };

  if (loading && !searchResult)
    return (
      <Container>
        <Header />
        <TempContainer>
          <CircularProgress />
          <p>검색 중입니다.</p>
        </TempContainer>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Header />
        <TempContainer>
          <Alert severity="error">
            에러가 발생했습니다. 잠시 후 다시 시도해주세요.
          </Alert>
        </TempContainer>
      </Container>
    );

  return (
    <Container>
      <Header />
      <GridLayout>
        {typeB && !loading ? (
          <>
            {
              <Person
                nickname={test}
                profileImg={test}
                info={test}
                countFollowers={test2}
                countUserReview={test2}
                genres={test}
              />
            }
          </>
        ) : (
          <>
            {searchResult && !msg ? (
              searchResult?.map((result: any, index: number) => {
                return (
                  <GridSmallItem key={index}>
                    <BookInfo
                      onClick={() => onClick(index)}
                      imgUrl={result.cover}
                      title={result.title}
                      author={result.author}
                    />
                  </GridSmallItem>
                );
              })
            ) : (
              <NoResultMsg>{msg}</NoResultMsg>
            )}
          </>
        )}
      </GridLayout>
    </Container>
  );
};

export default SearchPage;
