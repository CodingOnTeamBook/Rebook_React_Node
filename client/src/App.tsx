import React, { FunctionComponent } from 'react';
import GlobalStyle from './style/globalStyles';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './hocAuth';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/common/Header';
import LandingPage from './pages/LandingPage';
import MyPage from './pages/MyPage';
import PeoplePage from './pages/PeoplePage';
import ReviewPage from './pages/ReviewPage';
import SearchPage from './pages/SearchPage';
import BookDetailPage from './pages/BookDetailPage';
import RecommendBookPage from './pages/RecommendBookPage';
import SignupPage from './pages/SignupPage';
import WriteReviewPage from './pages/WriteReviewPage';
import Footer from './components/common/Footer';

const MinHeightContainer = styled(Container)`
  min-height: 80vh;
`;

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <GlobalStyle />
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/my" exact component={MyPage} />
              <MinHeightContainer>
                <Route path="/" exact component={LandingPage} />
                <Route path="/people" exact component={PeoplePage} />
                <Route path="/review" exact component={ReviewPage} />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/recommend" exact component={RecommendBookPage} />
                <Route path="/book/:id" exact component={BookDetailPage} />
                <Route path="/signup" exact component={SignupPage} />
              </MinHeightContainer>
            </Switch>
            <Footer />
          </BrowserRouter>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
