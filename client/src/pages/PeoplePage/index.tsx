import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import Person from '../../components/PeopleComponent/Person';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import GridItem from 'layout/GridItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { genreTags } from '../../components/defaultData/genre';
import InfiniteScroll from 'react-infinite-scroll-component';
import shortInfo from 'globalFunction/shortInfo';

const PeopleContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const SelectButtonArea = styled.div`
  text-align: center;
`;

const GenreButton = styled(Button)`
  margin-bottom: 30px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &::before {
    content: '#';
  }
  &:not(:first-of-type) {
    margin-left: 10px;
  }
  &.selected {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

const PersonContainer = styled.div`
  cursor: pointer;
`;

const Message = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  font-size: 20px;
  margin: 20px 20px;
`;

const ScrollMessage = styled.span`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
`;

const PeoplePage: FunctionComponent = ({}) => {
  const [people, setPeople] = useState<any[]>([]);
  const [isEmptyPeople, setIsEmptyPeople] = useState(true);
  const [isSelected, setIsSelected] = useState<any[]>([0]);
  const [isHasMore, setIsHasMore] = useState(true);
  const [error, setError] = useState(null);
  const page = useRef(1);

  useEffect(() => {
    setIsEmptyPeople(false);
    setIsHasMore(true);
    fetchPerson();
  }, [isSelected]);

  const fetchPerson = async () => {
    try {
      setError(null);
      if (isSelected.length == 0) {
        alert('장르를 하나 이상 선택해주세요 😅');
        setIsSelected([0]);
        page.current = 0;
        setIsEmptyPeople(false);
      } else if (0 <= isSelected.length && isSelected.length <= 3) {
        isSelected.sort();
        await axios
          .get(`api/reviewer/${isSelected}?page=${page.current}`)
          .then((res) => {
            setPeople([...people, ...res.data.reviewers]);
            if (res.data.reviewers.length === 0) {
              setIsHasMore(false);
            } else {
              setIsHasMore(true);
            }
            setIsEmptyPeople(false);
            if (res.data.reviewers.length === 0 && people.length === 0) {
              setIsEmptyPeople(true);
            }
          });
      } else if (isSelected.length >= 4) {
        isSelected.pop();
        alert('장르를 3개 이하만 선택해주세요 😅');
        page.current = 0;
        setIsSelected([...isSelected]);
        setPeople([...people]);
        setIsEmptyPeople(false);
      }
    } catch (err) {
      setError(err);
    }
    page.current += 1;
  };

  const genreSelect = (index: any) => {
    if (isSelected.includes(index)) {
      setIsSelected((prevItems) => prevItems.filter((el) => el !== index));
      setPeople([]);
      page.current = 1;
    } else {
      setIsSelected((prevItems) => [...prevItems, index]);
      setPeople([]);
      page.current = 1;
    }
  };

  const checkFunc = (index: any) => isSelected.includes(index);
  const history = useHistory();

  // selectbox 값에 따라서 endpoint 다르게 해서 api 호출
  // loading, error 부분은 return을 다르게 하기
  // select 되는 부분은 ref로 값 가져오기
  // 페이지네이션 해야하니까 여기서 값을 넘기는게 좋을 것 같음.
  // person 부분도 사용자 수정 부분은 없으니까 props로 넘기기

  return (
    <PeopleContainer>
      <SelectButtonArea>
        {genreTags.map((tag, index) => (
          <GenreButton
            key={tag.type}
            onClick={() => {
              genreSelect(index);
            }}
            className={checkFunc(tag.type) ? 'selected' : ''}
          >
            {tag.value}
          </GenreButton>
        ))}
      </SelectButtonArea>
      {error ? (
        <Message>에러가 발생했습니다 😭</Message>
      ) : isEmptyPeople ? (
        <Message> 등록된 리뷰어가 없습니다 😢 </Message>
      ) : (
        <InfiniteScroll
          style={{ overflow: 'hidden', padding: '10px' }}
          dataLength={people.length}
          next={fetchPerson}
          hasMore={isHasMore}
          loader={<ScrollMessage> 로딩 중 입니다 📚 </ScrollMessage>}
          endMessage={
            <ScrollMessage> 더 이상 리뷰어가 없습니다. </ScrollMessage>
          }
        >
          <GridLayout>
            <>
              {people &&
                people.map((person) => (
                  <GridItem key={person.id}>
                    <PersonContainer
                      onClick={() => {
                        history.push(`/people/${person.nickname}`);
                      }}
                    >
                      <Person
                        nickname={person.nickname}
                        profileImg={person.profileImg}
                        genres={person.genres}
                        info={shortInfo(person.info)}
                        countUserReview={person.countUserReview}
                      />
                    </PersonContainer>
                  </GridItem>
                ))}
            </>
          </GridLayout>
        </InfiniteScroll>
      )}
    </PeopleContainer>
  );
};

export default PeoplePage;
