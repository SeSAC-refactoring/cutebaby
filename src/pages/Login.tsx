import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginUrl } from "../services/kakaoService";
import styles from "../styles/Login.module.scss";
import { Session } from "inspector/promises";
import { Input, InputError } from "../components/commons/Input";
// import Input from "../components/commons/Input";
// import { Input } from "../components/commons/Input";

// 사용자 정보 인터페이스 정의
interface UserInfo {
  username: string;
  userid: string;
  password: string;
}

const EmailLogin: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // 이메일 상태관리하기
  const [inputpassword, setinputPassword] = useState<string>(""); // 비밀번호 상태관리하기
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // 사용자 정보 상태관리하기
  const [error, setError] = useState<string>(""); // 에러 상태
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      gotoTestMain(); // 로그인 성공 시 자동 이동
    }
  }, [userInfo]);

  // 이메일 입력값 처리 함수 설정
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 비밀번호 입력값 처리 함수 설정
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputPassword(e.target.value);
  };

  // 이메일로 사용자 정보 조회
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로 고침 방지

    try {
      const emailPost = await axios.post("http://localhost:5001/api/user", {
        email,
        inputpassword,
      });
      console.log("response >>>", emailPost.data[0]);
      if (emailPost.data.length > 0) {
        const user = emailPost.data[0];
        sessionStorage.setItem("user", JSON.stringify(user)); // 사용자 정보를 sessionStorage에 저장
        setError(""); // 에러 초기화
      }
      if (emailPost.data[0].password !== inputpassword) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setUserInfo(emailPost.data[0]);
        setError(""); // 에러 초기화
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 404) {
          setError("사용자를 찾을 수 없습니다.");
        } else {
          setError("서버 오류가 발생했습니다.");
        }
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
      setUserInfo(null); // 오류 발생 시 사용자 정보 초기화
    }
  };

  const gotoTestMain = () => {
    navigate("/Mypage", { state: userInfo }); // Mypage로 이동
  };

  return (
    <div className={styles.background}>
      <h1>로그인</h1>
      <div>이미지</div>
      <form onSubmit={handleSubmit}>
        <label>이메일*</label>
        <Input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="이메일을 입력하세요"
        />
        <label>비밀번호*</label>
        <Input
          type="password"
          value={inputpassword}
          onChange={handleInputPassword}
          placeholder="비밀번호를 입력하세요"
        />
        <button className={styles.btn} type="submit">
          <Link to="/Home">로그인</Link>
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <hr />
      <a href={getKakaoLoginUrl()}>
        <img src="img/kakaoLoginImg.png" alt="카카오 로그인" />
      </a>
    </div>
  );
};

export default EmailLogin;
