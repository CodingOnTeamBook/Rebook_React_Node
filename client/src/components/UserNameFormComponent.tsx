import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { LineGreenBtn } from '../style/componentStyled';
import useInput from '../hooks/useInput';
import { CheckNickname } from '../API/USER_PUBLIC_API';

const CheckBtn = styled(LineGreenBtn)`
  position: static;
  margin-left: 1em;
  height: 56px;
`;

const UserNameForm = forwardRef((props, ref) => {
  const { value, onChange } = useInput({ initialValue: '' });
  const [isPossible, SetIsPossible] = useState<boolean>(false);
  const handleSubmit = () => {
    if (value != '') {
      CheckNickname(value).then((response) => {
        if (!response.success) {
          alert('중복 검사가 완료되지 않았습니다. 다시 시도해주세요.');
        }
        SetIsPossible(response.results);
      });
    } else {
      alert('닉네임을 입력 후 시도해주세요.');
    }
  };
  useImperativeHandle(ref, () => ({
    getInputData: () => {
      if (isPossible) return value;
    },
  }));
  return (
    <div>
      <label>
        <TextField
          autoFocus
          label="user name"
          type="text"
          variant="outlined"
          onChange={onChange}
          name="customer"
          value={value}
          InputProps={{
            readOnly: isPossible,
          }}
        />
      </label>
      {!isPossible && (
        <CheckBtn type="submit" variant="outlined" onClick={handleSubmit}>
          중복검사
        </CheckBtn>
      )}
    </div>
  );
});

export default UserNameForm;
