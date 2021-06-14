import React, { useEffect, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { getAuthThunk } from './redux/user/AuthReducer';
import { RouteComponentProps } from 'react-router';

export default function Auth(
  SpecificComponent: FunctionComponent,
  option: boolean | null
) {
  //option => null ( 아무나 ) true ( 로그인 한 유저만 ) false ( 로그인 안 한 유저만)
  function AuthenticationCheck({ history }: RouteComponentProps) {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(
      (state: RootState) => state.auth
    );
    useEffect(() => {
      if (!loading && !data && !error) {
        dispatch(getAuthThunk());
      }
      if (error) {
        history.push('/');
      }
      if (data?.isAuth && option == false) {
        history.push('/');
      }
      if (data?.isAuth == false && option) {
        history.push('/');
      }
    }, [data, error]);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
