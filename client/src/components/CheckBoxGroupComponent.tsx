import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import useCheck from '../hooks/useCheck';

const TagsContainer = styled(FormGroup)`
  display: block;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FormControlContainer = styled(FormControl)`
  margin: 3rem;
`;

interface IProps {
  tags: Array<ITag>;
}

interface ITag {
  value: string;
  type: number;
}

const CheckboxesGroup = forwardRef(({ tags }: IProps, ref) => {
  const tempList: Array<string> = [];
  const renderFormControlLabel = tags.map((tag: ITag) => {
    const { value, onChange, CheckedValue } = useCheck({
      name: tag.value,
      initialValue: false,
    });
    if (CheckedValue) {
      tempList.push(CheckedValue.name);
    }
    return (
      <FormControlLabel
        key={tag.type}
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={value}
            onChange={onChange}
            name={tag.value}
          />
        }
        label={tag.value}
      />
    );
  });
  useImperativeHandle(ref, () => ({
    getCheckData: () => tempList,
  }));
  return (
    <Container>
      <FormControlContainer required>
        <FormLabel component="legend">최대 3개 까지 선택해주세요</FormLabel>
        <TagsContainer>{renderFormControlLabel}</TagsContainer>
      </FormControlContainer>
    </Container>
  );
});

export default CheckboxesGroup;
