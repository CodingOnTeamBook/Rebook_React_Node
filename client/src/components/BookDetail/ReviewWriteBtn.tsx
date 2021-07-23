import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import { auth } from '../../API/USER_PRIVATE_API/index';

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

const ReviewWriteBtn = ({ isbn }: any) => {
  const history = useHistory();
  const onClick = () => {
    getAuth();
    async function getAuth() {
      try {
        const response = await auth();
        response.isAuth
          ? history.push({ pathname: '/write', state: { isbn } })
          : alert('먼저 로그인 해주세요!');
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Button onClick={onClick}>
      <AddIcon fontSize="large" />
    </Button>
  );
};

export default ReviewWriteBtn;
