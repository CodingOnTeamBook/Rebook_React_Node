import React, { FunctionComponent } from 'react';
import ReviewMain from '../../components/ReviewComponent/ReviewMain';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '30px',
      flexGrow: 1,
    },
  })
);

const ReviewPage: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* 3 * 4 = 12 */}
        <ReviewMain />
        <ReviewMain />
        <ReviewMain />
      </Grid>
    </div>
  );
};

export default ReviewPage;
