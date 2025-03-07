import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginUrl } from "../services/kakaoService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchBabyInfo } from "../store/babySlice";

// props로 데이터 받아서 회원가입, 로그인 구분
// <div >{Email? "이메일" : "회원가입"}</div>

export default function SelectLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const [selectSignup, setSelect] = useState<boolean>(false);
  const signup = () => {
    if (!selectSignup) {
      setSelect(true);
    } else if (selectSignup) {
      setSelect(false);
    }
  };
  const testAccount = {
    email: "test@sesac.com",
    password: "testuser1!",
  };
  const handleTestLogin = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${API_URL}/user`, {
        email: testAccount.email,
        inputpassword: testAccount.password,
      });

      if (response.data.length > 0) {
        const user = response.data[0];

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("usernumber", JSON.stringify(user.usernumber));
        sessionStorage.setItem("useremail", user.userid);
        sessionStorage.setItem("username", user.username);
        dispatch(fetchBabyInfo());

        navigate("/");
      } else {
        alert("테스트 계정 로그인 실패: 사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("테스트 계정 로그인 오류가 발생했습니다.");
    }
  };

  // 로그인 되어있을 시 // 홈페이지로 리디렉션
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <main className="selectLoginMain">
      <div className="centerWrapper">
        <section className="contentsSectionWrap max-w-[35rem]">
          <h2>{!selectSignup ? "로그인" : "회원가입"}</h2>
          <div className=" flex flex-col gap-[3rem] h-full w-full">
            <img
              src="/img/visuals/visual_login_ggomul_01_.svg"
              className="h-[40%]"
            />
            <section className="flex items-center flex-col gap-[2.5rem] w-full">
              <div className="confirmBtnArea w-full flex flex-col items-center gap-2">
                {!selectSignup ? (
                  <Link to="/Login" className="w-full">
                    <button className="emailLoginBtn w-full">
                      <img src="/img/icons/i-mail-s32.svg"></img>
                      이메일로 로그인하기
                    </button>
                  </Link>
                ) : (
                  <Link to="/Signup" className="w-full">
                    <button>
                      <img src="/img/icons/i-mail-s32.svg"></img>
                      이메일로 회원가입하기
                    </button>
                  </Link>
                )}

                <a
                  href={getKakaoLoginUrl()}
                  style={{ textDecorationLine: "none" }}
                  className="w-full"
                >
                  {!selectSignup ? (
                    <button className="kakaoLoginBtn w-full">
                      <img src="/img/icons/i-kakaotalk-s32.svg"></img>
                      카카오톡으로 로그인하기
                    </button>
                  ) : (
                    ""
                  )}
                </a>
              </div>
              <div className="flex gap-1">
                <div className="text-gray-8">
                  {!selectSignup
                    ? "가입하지 않으셨나요?"
                    : "계정이 있으신가요?"}
                </div>
                <div onClick={signup} className="font-bd text-gray-8 underline">
                  {/* <Link to="/Signup">회원가입하기</Link> */}
                  {!selectSignup ? "회원가입하기" : "로그인하기"}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
