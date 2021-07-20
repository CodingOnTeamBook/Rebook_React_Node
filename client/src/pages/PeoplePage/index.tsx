import React, { FunctionComponent, useEffect, useState } from 'react';
import Person from '../../components/PeopleComponent/Person';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { genreTags } from '../../components/defaultData/genre';

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
  const [filterSelected, setFilterSelected] = useState(false);
  const [isSelected, setIsSelected] = useState<any[]>([0]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPerson('0');
  }, [isSelected]);

  const _handleFilterPress = (tag: number, index: number) => {
    if (isSelected.includes(index)) {
      setIsSelected((prevItems) => prevItems.filter((el) => el !== index));
    } else setIsSelected((prevItems) => [...prevItems, index]);
  };

  const checkFunc = (index: any) => isSelected.includes(index);

  const fetchPerson = async (type: any) => {
    try {
      setError(null);
      setPeople([]);
      setLoading(true);
      if (isSelected.length == 0) {
        alert('장르를 하나 이상 선택해주세요😅');
        setIsSelected([0]);
      } else if (isSelected.length < 4) {
        isSelected.sort();
        const res = await axios.get(`/api/reviewer/${isSelected}`);
        setPeople(res.data.reviewers);
      } else {
        isSelected.pop();
        alert('장르를 3개 이하만 선택해주세요😅');
      }
      console.log(people);
    } catch (err) {
      setError(err);
    }
    return () => setLoading(false);
  };

  return (
    <PeopleContainer>
      <SelectButtonArea>
        {genreTags.map((tag, index) => (
          <TagButton
            key={tag.type}
            // onClick={() => fetchPerson(tag.type)}
            onClick={() => {
              _handleFilterPress(tag.type, index);
              fetchPerson(tag.type);
            }}
            className={checkFunc(index) ? 'selected' : ''}
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
