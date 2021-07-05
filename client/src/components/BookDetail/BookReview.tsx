import { orange } from '@material-ui/core/colors';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const BookReviewContainer = styled.main`
  margin: 50px 0;
  height: 70vh;
  background-color: ${(props) => props.theme.palette.yellow};
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  background-color: white;
`;

const Button = styled.button`
  width: 50%;
  height: 60px;
  border: 0px;
  padding: 12px;
  cursor: pointer;

  &.selected {
    background-color: ${(props) => props.theme.palette.yellow};
  }
`;

const BookReview: FunctionComponent = () => {
  const [buttons, setButtons] = useState([
    { name: '최신순', selected: true },
    { name: '인기순', selected: false },
  ]);

  const onClick = (index: number) => {
    const tmp = [...buttons];
    tmp[index].selected = true;
    index === 0 ? (tmp[1].selected = false) : (tmp[0].selected = false);
    setButtons(tmp);
    console.log(buttons);
  };

  return (
    <BookReviewContainer>
      <ButtonContainer>
        {buttons.map(({ name, selected }, index) => (
          <Button
            key={index}
            onClick={() => onClick(index)}
            className={selected ? 'selected' : ''}
          >
            {name}
          </Button>
        ))}
      </ButtonContainer>
    </BookReviewContainer>
  );
};

export default BookReview;
