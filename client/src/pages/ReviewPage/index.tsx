import React, { FunctionComponent } from 'react';
import ReviewMain from '../../components/ReviewComponent/ReviewMain';
import styled from 'styled-components';
import GridLayout from '../../components/common/GridLayout';
import SelectSort from '../../components/ReviewComponent/SelectSort';
import GridItem from '../../components/common/GridItem';

const ReviewContainer = styled.div`
  margin-top: 30px;
  flex-grow: 1;
`;

const ReviewPage: FunctionComponent = () => {
  return (
    <ReviewContainer>
      <SelectSort />
      <GridLayout>
        <>
          <GridItem>
            <ReviewMain />
          </GridItem>
        </>
      </GridLayout>
    </ReviewContainer>
  );
};

export default ReviewPage;
