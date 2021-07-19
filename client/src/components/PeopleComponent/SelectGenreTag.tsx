import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const TagButton = styled(Button)`
  margin-bottom: 30px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
  &::before {
    content: '#';
  }
  &:not(:first-of-type) {
    margin-left: 10px;
  }
  &.selected {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
`;

interface IProps {
  tags: Array<ITag>;
  onSelect(value: string): any;
}

interface ITag {
  value: string;
  type: number;
  selected: boolean;
}

const SelectTag = ({ tags, onSelect }: IProps) => {
  const tagButton = tags.map((tag: ITag) => {
    return (
      <TagButton
        key={tag.type}
        className={tag.selected ? 'selected' : ''}
        onClick={() => onSelect(tag.value)}
      >
        {tag.value}
      </TagButton>
    );
  });
  return <div> {tagButton} </div>;
};

export default SelectTag;
