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
import AddCircle from '@material-ui/icons/AddCircle';
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
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  height: 100px;
  justify-content: center;
`;

const UserInfo = styled.div`
  /* width: 100%; */
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

const AddCommentBtn = styled(LineGreenBtn)`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 13px;
  height: 80%;
`;

const CommnetComponent: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
      <Avatar
        alt="Mark Zuckerberg"
        src="https://about.fb.com/ko/wp-content/uploads/sites/16/2019/01/mz.jpg?w=2048"
      />
      <InputBase
        className={classes.input}
        placeholder="감상평을 입력해주세요..."
        multiline
        rows="5"
      />
      <IconButton type="submit" className={classes.iconButton}>
        <AddCircle />
      </IconButton>
    </Paper>
  );
};

export default CommnetComponent;
