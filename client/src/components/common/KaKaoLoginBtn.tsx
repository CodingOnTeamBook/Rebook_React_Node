import axios from 'axios';
import React, { FunctionComponent } from 'react';
import KakaoLogin from 'react-kakao-login';
import { KAKAO_API_KEY } from '../../config';
import { login } from '../../API/USER_PRIVATE_API';

const KakaoLoginBtn: FunctionComponent = () => {
  const user = {
    user_Id: 0,
    user_gender: null,
    user_age: 0,
    user_name: '',
    user_profile_image: '',
    user_token: '',
  };

  const LoginSuccess = ({ response, profile }: any) => {
    // user.user_Id = profile.id;
    // user.user_gender = profile.kakao_account.gender;
    // user.user_age = profile.kakao_account.age_range;
    // user.user_name = profile.properties.nickname;
    // user.user_profile_image = profile.properties.profile_image;
    // user.user_token = response.access_token;
    login(profile.id).then((data) => {
      if (!data.success) {
        alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
        localStorage.clear();
      }
      if (data.type == 0) {
        location.href = '/signup';
        localStorage.clear();
      }
      const { accessToken } = data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      location.href = '/';
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
