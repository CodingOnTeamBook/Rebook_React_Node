import React, { FunctionComponent } from 'react';
import { Paper } from '@material-ui/core';

interface Props {
  id?: number;
  src: string;
}

const Item: FunctionComponent<Props> = ({ src }: Props) => {
  return (
    <Paper>
      <img src={src} alt={src} />
    </Paper>
  );
};

export default Item;
