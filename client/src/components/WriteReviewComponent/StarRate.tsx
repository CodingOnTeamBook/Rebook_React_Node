import React, { FunctionComponent, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';

const StarsWrapper = styled.div`
  margin-top: 2rem;
`;

const StarRate: FunctionComponent = () => {
  const [rate, setRate] = useState(3);
  const StarRateProps = {
    value: 3,
    size: 50,
    isHalf: false,
    activeColor: '#ffd700',
    onChange: (newValue: any) => {
      console.log(`RATE: value is ${newValue}`);
      setRate(newValue);
    },
  };

  return (
    <StarsWrapper>
      <ReactStars {...StarRateProps} />
    </StarsWrapper>
  );
};

export default StarRate;
