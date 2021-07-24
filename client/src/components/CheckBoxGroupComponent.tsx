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
`;

const FormControlContainer = styled(FormControl)`
  margin: 1rem 0;
`;

interface IProps {
  tags: Array<ITag>;
}

interface ITag {
  value: string;
  type: number;
  defaultValue: boolean;
}

const CheckboxesGroup = forwardRef(({ tags }: IProps, ref) => {
  const tempList: Array<string | number> = [];
  const renderFormControlLabel = tags.map((tag: ITag, index) => {
    const { value, onChange, CheckedValue } = useCheck({
      name: tag.type,
      initialValue: tag.defaultValue,
    });
    if (CheckedValue) {
      if (tempList.length > 2) {
        onChange();
        alert('3개를 초과할 수 없습니다.');
      } else {
        tempList.push(CheckedValue.name);
      }
    }
    return (
      <FormControlLabel
        key={index}
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
    getCheckData: () => tempList.join(),
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
