import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import React, { FunctionComponent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import ArrowForwardOutlined from '@material-ui/icons/ArrowForwardOutlined';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    input: {
      // marginTop: '10px',
      // marginBottom: '10px',
      marginLeft: theme.spacing(1),
      flex: 1,
      width: '100%',
    },
    iconButton: {
      padding: 10,
    },
  })
);

const AddComment: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Paper elevation={0} component="form" className={classes.root}>
      <Grid container wrap="nowrap" alignItems="center">
        <Grid item>
          <Avatar
            alt="Mark Zuckerberg"
            src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
          />
        </Grid>
        <Grid item xs zeroMinWidth>
          <InputBase
            className={classes.input}
            placeholder="댓글을 입력해주세요..."
            multiline
            rows="3"
          />
        </Grid>
        <Grid>
          <IconButton type="submit" className={classes.iconButton}>
            <ArrowForwardOutlined />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddComment;
