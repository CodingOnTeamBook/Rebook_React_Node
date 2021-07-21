import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';

interface IGridItemProps {
  children: NonNullable<React.ReactNode>;
}

const GridItem: FunctionComponent<IGridItemProps> = ({
  children,
}: IGridItemProps) => {
  return (
    <Grid item lg={2} md={3} xs={6} zeroMinWidth>
      {children}
    </Grid>
  );
};

export default GridItem;
