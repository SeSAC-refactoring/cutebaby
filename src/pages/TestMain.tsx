import React from 'react';
import { useLocation } from 'react-router-dom';

const TestMain: React.FC = () => {
  const location = useLocation();
  const userInfo = location.state as { username: string, userid: string, password: string };
  if (!userInfo) {
    return <div>로그인 정보가 없습니다.</div>;
  }
  return (
    <div>
      <h2>Welcome to TestMain, {userInfo.username}!</h2>
      <p>이메일: {userInfo.userid}</p>
    </div>
  );
};

export default TestMain;
