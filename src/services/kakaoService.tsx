import axios from "axios";

const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

const REST_API_KEY = "b2740a7fdc4c83d80f3b6ebb17d2279d"; // 카카오 개발자 콘솔에서 발급받은 REST API 키
const REDIRECT_URI = "https://babynote.netlify.app/oauth/callback/kakao";

// 카카오 로그인 URL 생성
export const getKakaoLoginUrl = (): string => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};

// 카카오 액세스 토큰 가져오기
export const getKakaoToken = async (code: string) => {
  try {
    const response = await axios.post(KAKAO_AUTH_URL, null, {
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data.access_token;
  } catch (error) {
    // console.error("카카오 토큰 요청 실패:", error);
    throw error;
  }
};

// 카카오 사용자 정보 가져오기
export const getKakaoUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get(KAKAO_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    // console.error('카카오 사용자 정보 요청 실패:', error);
    throw error;
  }
};
