import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const TagsContainer = styled(FormGroup)`
  display: block;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    formControl: {
      margin: theme.spacing(7),
    },
  })
);

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  tags: { [key: string]: boolean };
}

const CheckboxesGroup: FunctionComponent<Props> = ({
  handleChange,
  error,
  tags,
}: Props) => {
  const { root, formControl } = useStyles();

  function renderFormControlLabel(tag: [string, boolean]): JSX.Element {
    const [tagName, tagValue] = tag;
    return (
      <FormControlLabel
        key={tagName}
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={tagValue}
            onChange={handleChange}
            name={tagName}
          />
        }
        label={tagName}
      />
    );
  }

  return (
    <div className={root}>
      <FormControl
        required
        error={error}
        component="fieldset"
        className={formControl}
      >
        <FormLabel component="legend">최대 3개 까지 선택해주세요</FormLabel>
        <TagsContainer>
          {Object.entries(tags).map(renderFormControlLabel)}
        </TagsContainer>
      </FormControl>
    </div>
  );
};

export default CheckboxesGroup;
