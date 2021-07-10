import React from 'react';
import styled from 'styled-components';
import { ProfileImg } from '../../style/componentStyled';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useCheck from '../../hooks/useCheck';

const Container = styled.div`
  border-radius: 16px;
  background-color: #f2f2f2;
  box-shadow: 2px 2px 2px rgba(150, 150, 150, 0.24);
  margin: 0.4rem;
  cursor: pointer;
  display: flex;
  width: 100%;
`;

const GreenCheckbox = styled(Checkbox)`
  color: ${(props) => props.theme.palette.green};
  &:checked {
    color: ${(props) => props.theme.palette.darkgreen};
  }
  &:hover {
    color: ${(props) => props.theme.palette.green};
  }
`;

const DeleteCheck = styled.div`
  margin: 0.2rem;
`;
const ReviewerProfileImg = styled(ProfileImg)`
  margin: 0.8rem 2rem;
  padding: 0.1rem;
  width: 50px;
  height: 50px;
  border: 2px solid ${(props) => props.theme.palette.yellow};
`;

const InfoContainer = styled.div`
  padding: 0.1rem;
  margin: 0.8rem;
  h5 {
    margin: 0;
    margin-top: 0.3rem;
    padding: 0;
    font-size: 14px;
  }
  p {
    margin: 0;
    margin-top: 0.4rem;
    padding: 0;
    font-size: 10px;
    color: ${(props) => props.theme.palette.black};
  }
`;

const Reviewer = () => {
  const { value, onChange, CheckedValue } = useCheck({
    name: '유저이름',
    initialValue: false,
  });
  return (
    <Container>
      <DeleteCheck>
        <GreenCheckbox
          color="default"
          checked={value}
          onChange={onChange}
          name={'유저이름'}
        />
      </DeleteCheck>
      <ReviewerProfileImg src="https://cdn.pixabay.com/photo/2020/10/12/22/15/glass-5650335_960_720.jpg" />
      <InfoContainer>
        <h5>이름</h5>
        <p>태그 /태그 /태그</p>
      </InfoContainer>
    </Container>
  );
};

export default Reviewer;
