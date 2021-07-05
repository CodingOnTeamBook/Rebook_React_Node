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
import ReviewDetailPage from './pages/ReviewDetailPage';
import PeopleDetailPage from './pages/PeopleDetailPage';

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
              <Route path="/my" exact component={Auth(MyPage, true)} />
              <MinHeightContainer>
                <Route path="/" exact component={Auth(LandingPage, null)} />
                <Route
                  path="/people"
                  exact
                  component={Auth(PeoplePage, null)}
                />
                <Route
                  path="/people/:id"
                  exact
                  component={Auth(PeopleDetailPage, null)}
                />
                <Route
                  path="/review"
                  exact
                  component={Auth(ReviewPage, null)}
                />
                <Route
                  path="/review/:id"
                  exact
                  component={Auth(ReviewDetailPage, null)}
                />
                <Route
                  path="/search"
                  exact
                  component={Auth(SearchPage, null)}
                />
                <Route
                  path="/recommend"
                  exact
                  component={Auth(RecommendBookPage, null)}
                />
                <Route
                  path="/book/:id"
                  exact
                  component={Auth(BookDetailPage, null)}
                />
                <Route
                  path="/signup"
                  exact
                  component={Auth(SignupPage, false)}
                />
                <Route
                  path="/write"
                  exact
                  component={Auth(WriteReviewPage, true)}
                />
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
