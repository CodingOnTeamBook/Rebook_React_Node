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

//다음 페이지로 넘어갈 때는 Link 사용
//Search도 페이지네이션이 이루어지기 때문에
//select 했을 때 api endpoint만 바꿈.
//page는 ref값으로 관리
//select값 바꿨을 때 endpoint, page 리셋(리셋하는 함수 따로 빼기)
//한 페이지씩 로드했을 때 추가하기(현재 endpoint, 현재 page로 api 호출해서 배열에 추가)
//해당 북 정보는 북 디테일 페이지에서 해결

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
    console.log(sorts);
    if (sorts[0].selected) dispatch(fetchApi(query, 1));
    if (sorts[1].selected) {
      const getReviewer = async () => {
        const response = await SearchUsersByNickname(query);
        console.log(response.users);
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
        <SearchForm query={query} />
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
                      info={reviewer.info}
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
