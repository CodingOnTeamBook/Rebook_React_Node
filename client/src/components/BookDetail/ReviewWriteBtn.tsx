import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import AddIcon from '@material-ui/icons/Add';

const Button = styled(LineGreenBtn)`
  position: fixed;
  bottom: 5rem;
  right: 4rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.lightgreen};
  color: ${(props) => props.theme.palette.darkgreen};
  z-index: 10;

  &:hover {
    background-color: ${(props) => props.theme.palette.darkgreen};
    color: ${(props) => props.theme.palette.white};
  }
`;

const ReviewWriteBtn: FunctionComponent = () => {
  return (
    <Button>
      <AddIcon fontSize="large" />
    </Button>
  );
};

export default ReviewWriteBtn;
