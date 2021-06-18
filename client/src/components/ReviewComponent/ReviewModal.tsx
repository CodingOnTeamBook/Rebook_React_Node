import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BookInfo from './BookInfo';
import UserReview from './UserReview';
import AddComment from './AddComment';
import Grid from '@material-ui/core/Grid';

const CloseButtonArea = styled.p`
  background-color: white;
  width: 100%;
  text-align: right;
`;

interface ReviewModalProps {
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
      flexGrow: 1,
      overflow: 'visible',
      padding: theme.spacing(0, 3),
      backgroundColor: 'white',
      paddingBottom: 15,
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  })
);

const ReviewModal: FunctionComponent<ReviewModalProps> = ({
  handleClose,
}: ReviewModalProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item zeroMinWidth>
        <CloseButtonArea>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </CloseButtonArea>
        <BookInfo />
        <UserReview />
        <AddComment />
      </Grid>
    </div>
  );
};

export default ReviewModal;
