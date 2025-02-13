import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getKakaoToken, getKakaoUserInfo } from '../../services/kakaoService';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBabyInfo } from '../../store/babySlice';
import { fetchgrowInfo } from '../../store/GrowthDiarySlice';
import { AppDispatch, RootState } from '../../store';

const KakaoLogin = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const babyInfo = useSelector((state: RootState) => state.baby.babyInfo);
  const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleKakaoLogin(code);
    }
  }, [searchParams]);

  // Redux에서 babyInfo가 업데이트되면 fetchgrowInfo 실행하기
  useEffect(() => {  
    if (babyInfo && babyInfo.length > 0) {
  
      dispatch(fetchgrowInfo(babyInfo)) 
        .then(() => {
  
          navigate("/Home", { state: babyInfo });
        })
        .catch((error) => {
          console.error("성장 정보 요청 실패:", error);
        });
  
    } else {
      console.log("성장 정보 요청 중단: babyInfo가 없습니다.");
    }
  }, [babyInfo, dispatch, navigate]);
  
  
  
  

  // 카카오 로그인 처리
  const handleKakaoLogin = async (code: string) => {
    try {
      const accessToken = await getKakaoToken(code);
      const userData = await getKakaoUserInfo(accessToken);

      const response = await axios.post('http://localhost:5001/api/kakaosignup', { userData });

      if (response.data.success) {
        alert("로그인되었습니다!");
      } else {
        alert(response.data.message);
      }

      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem("usernumber", response.data.usernumber);
      sessionStorage.setItem('username', userData.properties.nickname);


      console.log("🔄 Redux에서 아기 정보 로드 시작");
      dispatch(fetchBabyInfo()); // ✅ Redux 상태 업데이트 후 `useEffect`에서 `fetchgrowInfo()` 실행

    } catch (error) {
      console.error('카카오 로그인 실패 :', error);
    }
  };

  return <div></div>;
};

export default KakaoLogin;
