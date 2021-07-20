import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from 'hocAuth';
import { Provider } from 'react-redux';
import Main from 'layout/Main';
import ModalLayout from 'layout/Modal';
import store from 'modules/store';
import Header from 'components/common/Header';
import LandingPage from 'pages/LandingPage';
import MyPage from 'pages/MyPage';
import PeoplePage from 'pages/PeoplePage';
import ReviewPage from 'pages/ReviewPage';
import SearchPage from 'pages/SearchPage';
import BookDetailPage from 'pages/BookDetailPage';
import SignupPage from 'pages/SignupPage';
import WriteReviewPage from 'pages/WriteReviewPage';
import Footer from 'components/common/Footer';
import ReviewDetailPage from 'pages/ReviewDetailPage';
import PeopleDetailPage from 'pages/PeopleDetailPage';
import LoginModalContents from 'components/common/LoginModalContents';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Main>
        <BrowserRouter>
          <Header />
          <Switch>
            <>
              <Route path="/my" exact component={Auth(MyPage, null)} />
              <Route path="/" exact component={Auth(LandingPage, null)} />
              <Route path="/people" exact component={Auth(PeoplePage, null)} />
              <Route
                path="/people/:id"
                exact
                component={Auth(PeopleDetailPage, null)}
              />
              <Route path="/review" exact component={Auth(ReviewPage, null)} />
              <Route
                path="/review/:id"
                exact
                component={Auth(ReviewDetailPage, null)}
              />
              <Route path="/search" exact component={Auth(SearchPage, null)} />
              <Route
                path="/book/:id"
                exact
                component={Auth(BookDetailPage, null)}
              />
              <Route path="/signup" exact component={Auth(SignupPage, false)} />
              <Route
                path="/write"
                exact
                component={Auth(WriteReviewPage, true)}
              />
            </>
          </Switch>
          <Footer />
        </BrowserRouter>
        <ModalLayout>
          <LoginModalContents />
        </ModalLayout>
      </Main>
    </Provider>
  );
};

export default App;
