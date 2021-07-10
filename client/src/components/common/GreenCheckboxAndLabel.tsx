import React, { useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useCheck from '../../hooks/useCheck';
import styled from 'styled-components';

const GreenCheckbox = styled(Checkbox)`
  color: ${(props) => props.theme.palette.green};
  &:checked {
    color: ${(props) => props.theme.palette.darkgreen};
  }
  &:hover {
    color: ${(props) => props.theme.palette.green};
  }
`;

interface IProps {
  labelName: string;
  defaultValue: boolean;
  submitValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const GreenCheckBox = ({ labelName, defaultValue, submitValue }: IProps) => {
  const { value, onChange, CheckedValue } = useCheck({
    name: labelName,
    initialValue: defaultValue,
  });

  useEffect(() => {
    if (CheckedValue) {
      submitValue(true);
    }
  }, [value]);

  return (
    <FormControlLabel
      control={
        <GreenCheckbox
          color="default"
          checked={defaultValue}
          onChange={onChange}
          name="책 이름 찾기"
        />
      }
      label={labelName}
    />
  );
};

export default GreenCheckBox;
