import React, {
  FunctionComponent,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';

const StarsWrapper = styled.div`
  margin-top: 2rem;
`;

const StarRate = (props: any, ref: any) => {
  const [rate, setRate] = useState(3);
  const StarRateProps = {
    value: 3,
    size: 50,
    isHalf: false,
    activeColor: '#ffd700',
    onChange: (rateValue: any) => {
      setRate(rateValue);
    },
  };

  useImperativeHandle(ref, () => ({
    getRate: () => rate,
  }));

  return (
    <StarsWrapper>
      <ReactStars {...StarRateProps} />
    </StarsWrapper>
  );
};

export default forwardRef(StarRate);
