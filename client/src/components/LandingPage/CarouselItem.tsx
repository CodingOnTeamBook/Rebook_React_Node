import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

interface Props {
  id?: number;
  src: string;
}

const PaperContainer = styled(Paper)`
  display: flex;
  align-items: center;
  border-radius: 25px;
  box-shadow: none;
  background-color: #f2f2f2;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 25px;
  }
`;

const Item: FunctionComponent<Props> = ({ src }: Props) => {
  return (
    <PaperContainer>
      <img src={src} alt={src} />
    </PaperContainer>
  );
};

export default Item;
