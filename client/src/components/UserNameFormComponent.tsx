import React, { useState, FunctionComponent } from 'react';
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

const UserNameForm: FunctionComponent<Props> = ({ handleChange }: Props) => {
  const [inputValue, setInputValue] = useState('');

  // input창의 고유 value(inputValue) 상태 관리 함수
  const handleInputValueChange = (event: any) => {
    return setInputValue(event.target.value);
  };

  // 부모 component의 userName state 변경을 위한 함수
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // To Do
    // 닉네임 중복 검사
    handleChange(inputValue);
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
          onChange={handleInputValueChange}
          name="customer"
          defaultValue={''}
        />
      </label>
      <CheckBtn type="submit" variant="outlined">
        중복검사
      </CheckBtn>
    </form>
  );
};

export default UserNameForm;
