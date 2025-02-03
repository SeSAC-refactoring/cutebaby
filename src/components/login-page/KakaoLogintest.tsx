// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { getKakaoToken, getKakaoUserInfo } from '../../services/kakaoService';

// const KakaoLogin: React.FC = () => {
//     const [searchParams] = useSearchParams();
//     const [userInfo, setUserInfo] = useState<any>(null);

//     useEffect(() => {
//         const code = searchParams.get('code'); // URL에서 "code" 파라미터 가져오기
//         if (code) {
//             handleKakaoLogin(code);
//         }
//     }, [searchParams]);

//     const handleKakaoLogin = async (code: string) => {
//         try {
//             const accessToken = await getKakaoToken(code);
//             const userData = await getKakaoUserInfo(accessToken);
//             setUserInfo(userData);
//             console.log('카카오 로그인 성공:', userData);
//         } catch (error) {
//             console.error('카카오 로그인 실패:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>카카오 로그인</h2>
//             {userInfo ? (
//                 <div>
//                     <h3>
//                         환영합니다, {userInfo.kakao_account.profile.nickname}님!
//                     </h3>
//                     <img
//                         src={userInfo.kakao_account.profile.thumbnail_image_url}
//                         alt="Profile"
//                     />
//                 </div>
//             ) : (
//                 <p>카카오 로그인을 진행 중...</p>
//             )}
//         </div>
//     );
// };

// export default KakaoLogin;
