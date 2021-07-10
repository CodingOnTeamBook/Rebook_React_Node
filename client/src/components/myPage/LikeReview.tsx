import React from 'react';
import styled from 'styled-components';
import SmallReview from './SmallReview';
import GridLayout from '../common/GridLayout';
import GridItem from '../common/GridItem';

const LikeReview = () => {
  return (
    <GridLayout>
      <>
        <GridItem>
          <SmallReview like={true} />
        </GridItem>
        <GridItem>
          <SmallReview like={true} />
        </GridItem>
        <GridItem>
          <SmallReview like={true} />
        </GridItem>
        <GridItem>
          <SmallReview like={true} />
        </GridItem>
        <GridItem>
          <SmallReview like={true} />
        </GridItem>
      </>
    </GridLayout>
  );
};

export default LikeReview;
