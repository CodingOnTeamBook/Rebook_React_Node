import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridSmallItem from '../../components/common/GridSmallItem';
import SearchForm from '../../components/common/SearchForm';
import Person from '../../components/PeopleComponent/Person';
import BookInfo from '../../components/common/BookInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { fetchApi } from '../../redux/search/action';
import { setBookInfo } from '../../redux/book/action';
import { SortButton } from '../ReviewPage';
import { SearchUsersByNickname } from '../../API/USER_PUBLIC_API/index';
import { IReviewer } from '../../API/REVIEWER_PUBLIC_API/reviewer.interface';

const Container = styled.div`
  margin: 2rem;
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
  const [reviewerResult, setReviewerResult] = useState<Array<IReviewer>>();
  const [noReviewerResult, setNoReviewerResult] = useState(false);

  // sorts state의 selected 속성을 바꾸는 함수
  const onSortChange = (index: number) => {
    const tmp = [...sorts];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setSorts(tmp);
  };

  useEffect(() => {
    if (sorts[0].selected) dispatch(fetchApi(query, 1));
    if (sorts[1].selected) {
      const getReviewer = async () => {
        const response = await SearchUsersByNickname(query);
        if (!response.users.length) setNoReviewerResult(true);
        else setReviewerResult(response.users);
      };
      getReviewer();
    }
  }, [sorts]);

  useEffect(() => {
    item && setSearchBookResult([...item]);
    return () => {
      setSearchBookResult(undefined);
    };
  }, [item]);

  const onClick = (index: number) => {
    const booksInfo = [...(searchBookResult as Array<any>)];

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
        {sorts[1].selected && !loading ? (
          <Person reviewer={reviewerResult} error={noReviewerResult} />
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
      </GridLayout>
    </Container>
  );
};

export default SearchPage;
