import React, { FunctionComponent } from 'react';
import Item from './CarouselItem';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import banner_001 from '../../style/img/banner_001.png';
import banner_002 from '../../style/img/banner_002.png';
import banner_003 from '../../style/img/banner_003.png';
import banner_004 from '../../style/img/banner_004.png';
import banner_005 from '../../style/img/banner_005.png';
import banner_006 from '../../style/img/banner_006.png';
import banner_007 from '../../style/img/banner_007.png';

const CarouselContainer = styled.div`
  margin-top: 50px;
`;

const CarouselComponent: FunctionComponent = () => {
  const BANNERS = [banner_001, banner_003, banner_004, banner_005, banner_006];

  return (
    <CarouselContainer>
      <Carousel>
        {BANNERS.map((banner, index) => (
          <Item src={banner} key={index} />
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default CarouselComponent;
