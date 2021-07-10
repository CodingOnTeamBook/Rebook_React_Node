import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';

interface IGridProps {
  children: JSX.Element;
}

const GridLayout: FunctionComponent<IGridProps> = ({
  children,
}: IGridProps) => {
  return (
    <Grid container lg={12} md={12} spacing={3}>
      {children}
    </Grid>
  );
};

export default GridLayout;
