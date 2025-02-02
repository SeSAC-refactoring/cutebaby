// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';

// // 사용자 정보 인터페이스 정의
// interface UserInfo {
//   username: string;
//   userid: string;
// }

// const LoginTest: React.FC = () => {
//   const [email, setEmail] = useState<string>('');  // 이메일 상태관리하기
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);  // 사용자 정보 상태관리하기
//   const [error, setError] = useState<string>('');  // 에러 상태

//   // 이메일 입력값 처리 함수
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value); //입력받은거 email변수에 저장하기
//   };

//   // 이메일로 사용자 정보 조회
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // 페이지 전체 새로고침되는거 막는거

//     try {
//       const response = await axios.post('http://localhost:5001/api/user', { email }); //이메일값받은거 node서버에 전달하면서 요청하는거 유저컨트롤러로 요청!
//       console.log("response >>>",response.data)
//       setUserInfo(response.data[0]);  // 응답받으면 그 값을 userinfo에다가 저장하기 콘솔로 response.data하면 배열안에 0번째 인덱스에 값이 저장되서 받아옴
//       setError('');  // 에러 초기화
//     } catch (err: unknown) {
//       if (err instanceof AxiosError) {  // AxiosError 타입으로 확인 에러뜨는지 확인 및에 에러에 맞춰서 수정해야함.
//         if (err.response && err.response.status === 404) {
//           setError('사용자를 찾을 수 없습니다.');
//         } else {
//           setError('서버 오류가 발생했습니다.');
//         }
//       } else {
//         setError('알 수 없는 오류가 발생했습니다.');
//       }
//       setUserInfo(null);  // 오류 발생 시 사용자 정보 초기화
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={handleInputChange}
//           placeholder="이메일을 입력하세요"
//         />
//         <button type="submit">로그인</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}  {/* 에러 메시지 표시 */}

//       {userInfo && (
//         <div>
//           <h2>사용자 정보</h2>
//           <p>이름: {userInfo.username}</p>
//           <p>이메일: {userInfo.userid}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginTest;
