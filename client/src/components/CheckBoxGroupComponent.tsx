import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const FlexRowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
    },
    formControl: {
      margin: theme.spacing(7),
    },
  })
);

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  tags: any;
}

function CheckboxesGroup(props: Props): React.ReactElement {
  const classes = useStyles();
  const { 소설, 인문학, 사회과학, 역사, 과학, 예술, 종교 } = props.tags;

  return (
    <div className={classes.root}>
      <FormControl
        required
        error={props.error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">최대 3개 까지 선택해주세요</FormLabel>
        <FormGroup>
          <FlexRowContainer>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={소설}
                  onChange={props.handleChange}
                  name="소설"
                />
              }
              label="소설"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={인문학}
                  onChange={props.handleChange}
                  name="인문학"
                />
              }
              label="인문학"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={사회과학}
                  onChange={props.handleChange}
                  name="사회과학"
                />
              }
              label="사회과학"
            />
          </FlexRowContainer>
          <FlexRowContainer>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={역사}
                  onChange={props.handleChange}
                  name="역사"
                />
              }
              label="역사"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={과학}
                  onChange={props.handleChange}
                  name="과학"
                />
              }
              label="과학"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={예술}
                  onChange={props.handleChange}
                  name="예술"
                />
              }
              label="예술"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={종교}
                  onChange={props.handleChange}
                  name="종교"
                />
              }
              label="종교"
            />
          </FlexRowContainer>
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default CheckboxesGroup;
