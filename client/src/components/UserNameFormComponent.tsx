import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { LineGreenBtn } from '../style/componentStyled';

const CheckBtn = styled(LineGreenBtn)`
  position: static;
  margin-left: 1em;
  height: 56px;
`;

interface Props {
  handleChange: (inputValue: string) => void;
}

function UserNameForm(props: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: any) => {
    return setInputValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // To Do
    // 닉네임 중복 검사
    props.handleChange(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <TextField
          autoFocus
          error={inputValue === '' ? true : false}
          helperText={'닉네임을 입력하세요'}
          label="user name"
          type="text"
          variant="outlined"
          onChange={handleChange}
          name="customer"
          defaultValue={''}
        />
      </label>
      <CheckBtn type="submit" variant="outlined">
        중복검사
      </CheckBtn>
    </form>
  );
}

export default UserNameForm;
