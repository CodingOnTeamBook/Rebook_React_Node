import axios from 'axios';
import React, { FunctionComponent } from 'react';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_API_KEY } from '../../config';
import { login } from '../../API/USER_PRIVATE_API';
import { useHistory } from 'react-router-dom';

interface IData {
  kakaoId: string;
  gender: string;
  ageRange: string;
}

const KakaoLoginBtn: FunctionComponent = () => {
  const history = useHistory();
  const LoginSuccess = ({ response, profile }: any) => {
    const Data: IData = {
      kakaoId: String(profile.id),
      gender: profile.kakao_account.gender,
      ageRange: profile.kakao_account.age_range,
    };
    login(profile.id).then((data) => {
      if (!data.success) {
        alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
        localStorage.clear();
      }
      if (data.type == 0) {
        history.push({
          pathname: '/signup',
          state: Data,
        });
      }
      if (data.type == 1) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.accessToken}`;
      }
      window.location.reload();
    });
  };

  const LoginFailure = ({ error }: any) => {
    console.log(error);
  };
  return (
    <KakaoLogin
      token={`${KAKAO_API_KEY}`}
      onSuccess={(result) => LoginSuccess(result)}
      onFail={(result) => LoginFailure(result)}
    >
      <div style={{ cursor: 'pointer' }}>Login With Kakao</div>
    </KakaoLogin>
  );
};

export default KakaoLoginBtn;
