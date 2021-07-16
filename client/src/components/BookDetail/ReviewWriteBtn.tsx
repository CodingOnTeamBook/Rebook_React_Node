import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';

const Button = styled(LineGreenBtn)`
  position: fixed;
  bottom: 5rem;
  right: 4rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.lightgreen};
  color: ${(props) => props.theme.palette.darkgreen};
  z-index: 10;

  &:hover {
    background-color: ${(props) => props.theme.palette.darkgreen};
    color: ${(props) => props.theme.palette.white};
  }
`;

const ReviewWriteBtn: FunctionComponent = () => {
  const history = useHistory();
  const onClick = () => {
    // Todo
    // 로그인 되어있는지 여부 확인해야함
    // 로그아웃 상태면 페이지 넘어가지 않고 로그인해주세요 alert창
    history.push('/write');
  };
  return (
    <Button onClick={onClick}>
      <AddIcon fontSize="large" />
    </Button>
  );
};

export default ReviewWriteBtn;
