import React, { useState } from 'react';

interface IProps {
  name: string;
  initialValue: boolean;
}

const useCheck = ({ name, initialValue }: IProps) => {
  const [value, setValue] = useState<boolean>(initialValue);
  const onChange = () => {
    setValue((prev) => !prev);
  };
  if (value) {
    return { value, onChange, CheckedValue: { name } };
  }
  return { value, onChange, CheckedValue: null };
};

export default useCheck;
