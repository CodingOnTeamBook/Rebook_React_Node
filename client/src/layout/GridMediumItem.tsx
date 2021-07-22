import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';

interface IGridItemMediumProps {
  children: NonNullable<React.ReactNode>;
}

const GridMediumItem: FunctionComponent<IGridItemMediumProps> = ({
  children,
}: IGridItemMediumProps) => {
  return (
    <Grid item lg={6} md={12} xs={12} zeroMinWidth>
      {children}
    </Grid>
  );
};

export default GridMediumItem;
