import React, { FunctionComponent } from 'react';
import Item from './CarouselItem';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import banner_001 from '../../style/img/banner_001.png';
import banner_002 from '../../style/img/banner_002.png';

const CarouselContainer = styled.div`
  margin-top: 50px;
`;

const CarouselComponent: FunctionComponent = () => {
  const items = [
    {
      id: 1,
      src: banner_001,
    },
    {
      id: 2,
      src: banner_002,
    },
  ];

  return (
    <CarouselContainer>
      <Carousel>
        {items.map(({ id, src }) => (
          <Item src={src} key={id} />
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default CarouselComponent;
