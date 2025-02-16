const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js";
const KAKAO_APP_KEY = "b2740a7fdc4c83d80f3b6ebb17d2279d"; // 본인의 Kakao JavaScript 키 입력

declare global {
  interface Window {
    Kakao: any; // Kakao 객체를 window 객체에 추가 (이 파일 내에서만)
  }
}

export const loadKakaoSDK = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.Kakao) {
      // console.log("Kakao SDK 이미 로드됨:", window.Kakao.isInitialized());
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_APP_KEY);
      }
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(KAKAO_APP_KEY);
        // console.log("Kakao SDK 로드 완료:", window.Kakao.isInitialized());
        resolve();
      } else {
        reject("Kakao SDK 로드 실패");
      }
    };
    script.onerror = () => reject("Kakao SDK 스크립트 로드 오류");

    document.body.appendChild(script);
  });
};
export const handleKakaoLogout = (): void => {
  if (window.Kakao) {
    window.Kakao.Auth.logout(() => {
      // console.log("카카오 로그아웃 완료");
      // 로그아웃 후 처리할 추가 로직 작성
      // 예를 들어, 사용자 정보를 초기화하거나 로그인 페이지로 리디렉션
    });
  } else {
    // console.error("카카오 SDK가 로드되지 않았습니다.");
  }
};
