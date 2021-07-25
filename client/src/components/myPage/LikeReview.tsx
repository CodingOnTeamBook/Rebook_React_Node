import React from 'react';
import styled from 'styled-components';
import SmallReview from './SmallReview';
import GridLayout from '../common/GridLayout';
import GridItem from '../common/GridItem';
import { getMyLike } from 'API/USER_PRIVATE_API';

const LikeReview = () => {
  getMyLike('안녕').then((response) => console.log(response));
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
