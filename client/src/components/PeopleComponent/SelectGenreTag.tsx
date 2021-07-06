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
`;

interface IProps {
  tags: Array<ITag>;
}

interface ITag {
  value: string;
  type: number;
}

const SelectTag = ({ tags }: IProps) => {
  const tagButton = tags.map((tag: ITag) => {
    return <TagButton key={tag.type}> {tag.value} </TagButton>;
  });
  return <div> {tagButton} </div>;
};

export default SelectTag;
