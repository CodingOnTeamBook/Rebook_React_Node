import React, { FunctionComponent } from 'react';
import ReviewMain from '../../components/ReviewComponent/ReviewMain';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '30px',
      flexGrow: 1,
    },
  })
);

const SortButton = styled(Button)`
  float: right;
  margin-bottom: 10px;
  margin-left: 10px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

const ReviewPage: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SortButton variant="outlined" size="large">
        인기순
      </SortButton>
      <SortButton variant="outlined" size="large">
        최신순
      </SortButton>
      <Grid container spacing={3}>
        {/* 4 * 3  = 12 */}
        <ReviewMain />
        <ReviewMain />
        <ReviewMain />
      </Grid>
    </div>
  );
};

export default ReviewPage;
