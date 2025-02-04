import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getKakaoToken, getKakaoUserInfo } from '../../services/kakaoService';
import axios, { AxiosError } from 'axios';


const KakaoLogin = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code'); // URL에서 "code" 파라미터 가져오기
    if (code) {
      handleKakaoLogin(code); // 카카오 로그인 함수 호출
    }
  }, [searchParams]);

  const handleKakaoLogin = async (code: string) => {
    try {
      const accessToken = await getKakaoToken(code);
      const userData = await getKakaoUserInfo(accessToken);
      setUserInfo(userData);
      // console.log('카카오 로그인 성공:', userData); // 로그인 성공 시 출력
      const response = await axios.post('http://localhost:5001/api/kakaosignup', {userData});
      console.log('response >>' , response)
      if (response.data.success) {
        console.log("회원가입 성공:", response.data.message);
        alert("로그인되었습니다!");
      } else {
        console.log("회원가입 실패:", response.data.message);
        alert(response.data.message);
      }
      const user = userData
      console.log('user >>>', user)
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem("usernumber", response.data.usernumber.toString()); // sessionStorage에 사용자 정보 저장 >>세션 유지!!
      // 로그인 후 Mypage로 이동
      console.log('Navigating to Mypage...');
      navigate('/Mypage', { state: userData });
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
    }
  };

  return <div></div>; // 실제 UI는 없으므로 빈 div 반
};

export default KakaoLogin;
