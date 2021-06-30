import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';

interface IGridItemProps {
  children: JSX.Element;
}

const GridItem: FunctionComponent<IGridItemProps> = ({
  children,
}: IGridItemProps) => {
  return (
    <Grid item sm={4} xs={12} zeroMinWidth>
      {children}
    </Grid>
  );
};

export default GridItem;
