import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import IconButton from '@material-ui/core/IconButton';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import ArrowForwardOutlined from '@material-ui/icons/ArrowForwardOutlined';
import { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100px',
    },
    input: {
      marginTop: '10px',
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

const CommnetComponent: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Paper elevation={0} component="form" className={classes.root}>
      <Avatar
        alt="Mark Zuckerberg"
        src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
      />
      <InputBase
        className={classes.input}
        placeholder="댓글을 입력해주세요..."
        multiline
        rows="5"
      />
      <IconButton type="submit" className={classes.iconButton}>
        <ArrowForwardOutlined />
      </IconButton>
    </Paper>
  );
};

export default CommnetComponent;
