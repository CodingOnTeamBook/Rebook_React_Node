import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { LineGreenBtn } from '../style/componentStyled';
import useInput from '../hooks/useInput';

const CheckBtn = styled(LineGreenBtn)`
  position: static;
  margin-left: 1em;
  height: 56px;
`;

const UserNameForm = forwardRef((props, ref) => {
  const { value, onChange } = useInput({ initialValue: '' });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // To Do
    // 닉네임 중복 검사
  };
  useImperativeHandle(ref, () => ({
    getInputData: () => value,
  }));
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <TextField
          autoFocus
          helperText={'닉네임을 입력하세요'}
          label="user name"
          type="text"
          variant="outlined"
          onChange={onChange}
          name="customer"
          value={value}
        />
      </label>
      <CheckBtn type="submit" variant="outlined">
        중복검사
      </CheckBtn>
    </form>
  );
});

export default UserNameForm;
