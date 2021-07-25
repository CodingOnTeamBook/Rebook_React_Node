import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const FooterContainer = styled.footer`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.yellow};
  margin-top: 4rem;
`;

const ScrollToTopBtn = styled.button`
  width: 50px;
  height: 50px;
  border: 0px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const GitHub = styled.p`
  margin-top: 18px;
  margin-bottom: 0;
  color: white;

  a {
    color: black;
  }

  a:hover {
    color: red;
  }
`;

const Footer: FunctionComponent = () => {
  const onClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <FooterContainer>
      <ScrollToTopBtn onClick={onClick}>
        <ArrowUpwardIcon fontSize="large" />
      </ScrollToTopBtn>
      <GitHub>
        2021{' '}
        <a
          href={'https://github.com/CodingOnTeamBook/Rebook_React_Node'}
          target={'_blank'}
          rel="noreferrer"
        >
          Team ReBook
        </a>{' '}
        All rights reserved
      </GitHub>
    </FooterContainer>
  );
};

export default Footer;
