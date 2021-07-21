import React, { FunctionComponent } from 'react';
import GlobalStyle from 'style/globalStyles';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import Footer from 'components/common/Footer';

const MinHeightContainer = styled(Container)`
  min-height: 100vh;
  height: auto;
`;

interface IProps {
  children: NonNullable<React.ReactNode>;
}

const Main: FunctionComponent<IProps> = ({ children }: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <GlobalStyle />
        <MinHeightContainer>{children}</MinHeightContainer>
        <Footer />
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Main;
