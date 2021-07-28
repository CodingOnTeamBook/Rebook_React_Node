import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridSmallItem from '../../components/common/GridSmallItem';
import SearchForm from '../../components/common/SearchForm';
import BookInfo from '../../components/common/BookInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules/rootReducer';
import { useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { fetchApi } from '../../modules/search/action';
import { SortButton } from '../ReviewPage';
import { SearchUsersByNickname } from '../../API/USER_PUBLIC_API/index';
import { IReviewer } from '../../API/REVIEWER_PUBLIC_API/reviewer.interface';
import Person from 'components/PeopleComponent/Person';
import GridItem from 'layout/GridItem';
import { Link } from 'react-router-dom';
import Sticky from 'react-sticky-el';
import shortInfo from 'globalFunction/shortInfo';

const Container = styled.div`
  margin: 2rem;
`;

const PersonContainer = styled(Link)`
  cursor: pointer;
`;

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const NoResultMsg = styled.h2`
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
  const location = useLocation();
  const query = decodeURI(location.search.split('=')[1]);

  const { item, loading, error, msg } = useSelector(
    (state: RootState) => state.search
  );

  const [sorts, setSorts] = useState([
    { text: '도서 검색', selected: true },
    { text: '리뷰어 검색', selected: false },
  ]);

  const [searchBookResult, setSearchBookResult] = useState<any[]>();
  const [reviewerResult, setReviewerResult] = useState<Array<IReviewer>>([]);
  const [noReviewerResult, setNoReviewerResult] = useState(false);

  // sorts state의 selected 속성을 바꾸는 함수
  const onSortChange = (index: number) => {
    const tmp = [...sorts];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setSorts(tmp);
  };

  useEffect(() => {
    // 도서검색탭
    if (sorts[0].selected) dispatch(fetchApi(query, 1));
    // 리뷰어검색탭
    if (sorts[1].selected) {
      const getReviewer = async () => {
        const response = await SearchUsersByNickname(query);
        if (!response.users.length) setNoReviewerResult(true);
        else {
          setNoReviewerResult(false);
          setReviewerResult(response.users);
        }
      };
      getReviewer();
    }
  }, [sorts, query]);

  useEffect(() => {
    item && setSearchBookResult([...item]);
    return () => {
      setSearchBookResult(undefined);
    };
  }, [item]);

  const onClick = (index: number) => {
    const booksInfo = [...(searchBookResult as Array<any>)];
    const { isbn13 } = booksInfo[index];
    history.push(`book/${isbn13}`);
  };

  const Header = () => {
    return (
      <>
        <Sticky>
          <SearchForm query={query} />
        </Sticky>
        <BtnArea>
          {sorts.map(({ text, selected }, index) => (
            <SortButton
              size="large"
              key={index}
              onClick={() => {
                onSortChange(index);
              }}
              className={selected ? 'selected' : ''}
            >
              {text}
            </SortButton>
          ))}
        </BtnArea>
      </>
    );
  };

  if (loading && !searchBookResult)
    return (
      <Container>
        <Header />
        <TempContainer>
          <CircularProgress />
          <p>검색 중입니다</p>
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
        <>
          {sorts[1].selected && !loading ? (
            noReviewerResult ? (
              <NoResultMsg>찾는 유저가 없어요😢</NoResultMsg>
            ) : (
              reviewerResult?.map((reviewer) => (
                <GridItem key={reviewer.id}>
                  <PersonContainer to={`/people/${reviewer.nickname}`}>
                    <Person
                      nickname={reviewer.nickname}
                      profileImg={reviewer.profileImg}
                      genres={reviewer.genres}
                      info={shortInfo(reviewer.info)}
                      countUserReview={reviewer.countUserReviews}
                    />
                  </PersonContainer>
                </GridItem>
              ))
            )
          ) : (
            <>
              {searchBookResult && !msg ? (
                searchBookResult?.map(
                  ({ cover, title, author }, index: number) => {
                    return (
                      <GridSmallItem key={index}>
                        <BookInfo
                          onClick={() => onClick(index)}
                          imgUrl={cover}
                          title={title}
                          author={author}
                        />
                      </GridSmallItem>
                    );
                  }
                )
              ) : (
                <NoResultMsg>{msg}</NoResultMsg>
              )}
            </>
          )}
        </>
      </GridLayout>
    </Container>
  );
};

export default SearchPage;
