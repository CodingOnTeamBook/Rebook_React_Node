import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewMain from '../ReviewComponent/ReviewMain';
import GridLayout from '../common/GridLayout';
import GridItem from '../common/GridItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useCheck from '../../hooks/useCheck';
import SmallReview from './SmallReview';

const Container = styled.div`
  width: 95%;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const GreenCheckbox = styled(Checkbox)`
  color: ${(props) => props.theme.palette.green};
  &:checked {
    color: ${(props) => props.theme.palette.darkgreen};
  }
  &:hover {
    color: ${(props) => props.theme.palette.green};
  }
`;

const CheckBoxArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MyReview = () => {
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const { value, onChange, CheckedValue } = useCheck({
    name: '비공개',
    initialValue: isPublic,
  });
  return (
    <Container>
      <CheckBoxArea>
        <FormControlLabel
          control={
            <GreenCheckbox
              color="default"
              checked={value}
              onChange={onChange}
              name="비공개"
            />
          }
          label="비공개"
        />
      </CheckBoxArea>
      <GridLayout>
        <>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
          <GridItem>
            <SmallReview />
          </GridItem>
        </>
      </GridLayout>
    </Container>
  );
};

export default MyReview;
