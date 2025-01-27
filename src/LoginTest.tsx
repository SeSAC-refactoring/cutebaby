import React, { useState } from 'react';
import { UserData } from './App';
// UserData 인터페이스를 정의하여 data 구조를 명확히 합니다.
interface UserData2 {
  userid: number;
  username: string;
  email: string;
}

interface LoginTestProps {
    data: UserData2[]; 
  }

const LoginTest: React.FC<LoginTestProps> = ({ data }) => {

  console.log('data>?>>>>', data);

  const [inputname, setInputname] = useState<string>('');  // inputname의 타입을 string으로 설정
  const [newname, setNewname] = useState<UserData[]>([]);  // newname의 타입을 UserData 배열로 설정

  // 이름 찾기 함수
  const namefind = () => {
    const newData = data.filter((beforename) => {
      return beforename.username.includes(inputname);
    });
    setNewname(newData);
  };

  console.log('newname >>>>', newname);

  return (
    <>
      <div>
        이름을 입력해보세요: <input type="text" onChange={(e) => setInputname(e.target.value)} />
        <button onClick={namefind}>db에 계정 있는지 없는지 확인</button>
        <h2>{newname.length === 0 ? '없는 계정' : "이미 있는 계정"}</h2>
      </div>
    </>
  );
};

export default LoginTest;
