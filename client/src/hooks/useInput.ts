import React, { useState } from 'react';

interface IProps {
  initialValue: string;
  validator?: (value: string) => boolean;
}

const useInput = ({
  initialValue,
  validator = (value: string) => true,
}: IProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { value } = e.target;
    if (validator(value)) {
      setValue(value);
    }
  };
  const setInitialValue = (newValue: string) => {
    setValue(newValue);
  };
  return { value, onChange, setInitialValue };
};

export default useInput;
