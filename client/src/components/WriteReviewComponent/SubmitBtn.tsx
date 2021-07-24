import React, { FunctionComponent } from 'react';
import { LineGreenBtn } from '../../style/componentStyled';
import styled from 'styled-components';

const Button = styled(LineGreenBtn)`
  margin: 50px 0;
  background-color: white;
`;

const SubmitBtn = () => {
  return <Button>리뷰 발행</Button>;
};

export default SubmitBtn;
