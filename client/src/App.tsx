import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollToTop } from './components/common/ScrollToTop';
import Auth from 'hocAuth';
import { Provider } from 'react-redux';
import Main from 'layout/Main';
import Header from 'components/common/Header';
import ModalLayout from 'layout/Modal';
import store from 'modules/store';
import LandingPage from 'pages/LandingPage';
import MyPage from 'pages/MyPage';
import PeoplePage from 'pages/PeoplePage';
import ReviewPage from 'pages/ReviewPage';
import SearchPage from 'pages/SearchPage';
import BookDetailPage from 'pages/BookDetailPage';
import SignupPage from 'pages/SignupPage';
import WriteReviewPage from 'pages/WriteReviewPage';
import ReviewDetailPage from 'pages/ReviewDetailPage';
import PeopleDetailPage from 'pages/PeopleDetailPage';
import LoginModalContents from 'components/common/LoginModalContents';
import { Helmet } from 'react-helmet';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Helmet>
        <meta
          charSet="utf-8"
          name="Landing Page"
          content="도서를 검색하고 도서에 대한 리뷰를 공유하는 사이트 ReBook 메인페이지입니다"
        />
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content="ReBook, Landing page, Main Page" />
        <title>Re:Book</title>
      </Helmet>
      <Main>
        <BrowserRouter>
          <ScrollToTop />
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
          <ModalLayout>
            <LoginModalContents />
          </ModalLayout>
        </BrowserRouter>
      </Main>
    </Provider>
  );
};

export default App;
