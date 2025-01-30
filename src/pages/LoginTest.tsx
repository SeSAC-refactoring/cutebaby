import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

// 사용자 정보 인터페이스 정의
interface UserInfo {
  username: string;
  email: string;
}

const LoginTest: React.FC = () => {
  const [email, setEmail] = useState<string>('');  // 이메일 상태
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);  // 사용자 정보 상태
  const [error, setError] = useState<string>('');  // 에러 상태

  // 이메일 입력값 처리 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 이메일로 사용자 정보 조회
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/user', { email });
      setUserInfo(response.data[0]);  // 일치하는 사용자 정보가 있으면 설정
      setError('');  // 에러 초기화
    } catch (err: unknown) {
      if (err instanceof AxiosError) {  // AxiosError 타입으로 확인
        if (err.response && err.response.status === 404) {
          setError('사용자를 찾을 수 없습니다.');
        } else {
          setError('서버 오류가 발생했습니다.');
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      setUserInfo(null);  // 오류 발생 시 사용자 정보 초기화
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="이메일을 입력하세요"
        />
        <button type="submit">로그인</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* 에러 메시지 표시 */}

      {userInfo && (
        <div>
          <h2>사용자 정보</h2>
          <p>이름: {userInfo.username}</p>
          <p>이메일: {userInfo.email}</p>
        </div>
      )}
    </div>
  );
};

export default LoginTest;
