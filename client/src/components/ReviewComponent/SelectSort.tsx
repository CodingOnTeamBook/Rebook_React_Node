import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const SelectSortContainer = styled.div`
  text-align: right;
`;

const SortButton = styled(Button)`
  margin-bottom: 30px;
  border-radius: 50px;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
  z-index: 0;
  &:hover {
    background-color: ${(props) => props.theme.palette.green};
    color: white;
  }
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const SelectSort: FunctionComponent = () => {
  return (
    <SelectSortContainer>
      <SortButton variant="outlined" size="large">
        최신순
      </SortButton>
      <SortButton variant="outlined" size="large">
        인기순
      </SortButton>
    </SelectSortContainer>
  );
};
export default SelectSort;
