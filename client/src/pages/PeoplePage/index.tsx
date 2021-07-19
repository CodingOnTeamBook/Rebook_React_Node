import React, { FunctionComponent, useEffect, useState } from 'react';
import Person from '../../components/PeopleComponent/Person';
import styled from 'styled-components';
import SelectGenreTag from '../../components/PeopleComponent/SelectGenreTag';
import GridLayout from '../../components/common/GridLayout';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { selectGenre } from '../../components/defaultData/selectGenre';

const PeopleContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const SelectButtonArea = styled.div`
  text-align: center;
`;

const TagButton = styled(Button)`
  margin-bottom: 30px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
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

const PeoplePage: FunctionComponent = ({}) => {
  const [people, setPeople] = useState<any[]>([]);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPerson('0');
  }, []);

  const fetchPerson = async (type: any) => {
    try {
      setError(null);
      setPeople([]);
      setLoading(true);
      const res = await axios.get(`/api/reviewer/${type}`);
      setPeople(res.data.reviewers);
      console.log(people);
    } catch (err) {
      setError(err);
    }
    return () => setLoading(false);
  };

  const onGenreChange = (type: any) => {
    if (type) {
      console.log(type);
      setCheckedGenre(type);
    }
  };

  // 장르 클릭 하면 setChecked에 들어가고 fetchPerson에 넣어줌
  // '1,2,3' 이런식으로
  // 최대 세 개만 가능하게 하기

  return (
    <PeopleContainer>
      <SelectButtonArea>
        {selectGenre.map((tag, index) => (
          <TagButton
            key={tag.type}
            // onClick={() => fetchPerson(tag.type)}
            onClick={() => {
              onGenreChange(tag.type);
              fetchPerson(tag.type);
            }}
            className={tag.selected ? 'selected' : ''}
          >
            {tag.value}
          </TagButton>
        ))}
      </SelectButtonArea>
      <GridLayout>
        <>
          {people &&
            people.map((person) => (
              <Person
                key={person.id}
                nickname={person.nickname}
                profileImg={person.profileImg}
                info={person.info}
                countFollowers={person.countFollowers}
                countUserReview={person.countUserReview}
              />
            ))}
        </>
      </GridLayout>
    </PeopleContainer>
  );
};

export default PeoplePage;
