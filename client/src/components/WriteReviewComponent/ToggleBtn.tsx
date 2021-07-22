import React, {
  FunctionComponent,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ToggleBtn = (props: any, ref: any) => {
  const [selected, setSelected] = useState(true);
  const control = {
    checked: selected,
    name: 'isPublic',
    onChange: () => {
      setSelected(!selected);
    },
  };

  useImperativeHandle(ref, () => ({
    getIsPublic: () => selected,
  }));

  return (
    <FormControlLabel
      control={<Switch {...control} />}
      label={
        selected ? '모두가 볼 수 있는 글이에요' : '나만 볼 수 있는 글이에요'
      }
    />
  );
};

export default forwardRef(ToggleBtn);
