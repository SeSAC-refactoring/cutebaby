import { Link, useNavigate } from 'react-router-dom';
import { getKakaoLoginUrl } from '../services/kakaoService';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchBabyInfo } from '../store/babySlice';

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
        email: 'test@sesac.com',
        password: 'testuser1!',
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

                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem(
                    'usernumber',
                    JSON.stringify(user.usernumber)
                );
                sessionStorage.setItem('useremail', user.userid);
                sessionStorage.setItem('username', user.username);
                dispatch(fetchBabyInfo());

                navigate('/');
            } else {
                alert('테스트 계정 로그인 실패: 사용자를 찾을 수 없습니다.');
            }
        } catch (error) {
            alert('테스트 계정 로그인 오류가 발생했습니다.');
        }
    };

    // 로그인 되어있을 시 // 홈페이지로 리디렉션
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });

    return (
        <main>
            <section className="authWrap loginSignupWrap">
                <h2>{!selectSignup ? '로그인' : '회원가입'}</h2>
                <section className="contentsArea">
                    {!selectSignup ? (
                        <img src="/img/visuals/visual_login_ggomul_01.svg" />
                    ) : (
                        <img src="/img/visuals/visual_signup_ggomul_02.svg" />
                    )}
                </section>
                <section className="confirmBtnArea">
                    <div className="buttonsWrap">
                        {!selectSignup ? (
                            <Link
                                to="/Login"
                                className="button button-black button-lg w-full"
                            >
                                <img src="/img/icons/i-mail-s32.svg"></img>
                                이메일로 로그인하기
                            </Link>
                        ) : (
                            <Link
                                to="/Signup"
                                className="button button-black button-lg w-full"
                            >
                                <img src="/img/icons/i-mail-s32.svg"></img>
                                이메일로 회원가입하기
                            </Link>
                        )}

                        <a
                            href={getKakaoLoginUrl()}
                            style={{ textDecorationLine: 'none' }}
                            className="w-full"
                        >
                            {!selectSignup ? (
                                <button className="button-kakao button-lg w-full">
                                    <img src="/img/icons/i-kakaotalk-s32.svg"></img>
                                    카카오톡으로 로그인하기
                                </button>
                            ) : (
                                ''
                            )}
                        </a>
                    </div>
                    {/* <div className="flex gap-1 text-gray-8 text-xs">
            {!selectSignup ? "가입하지 않으셨나요?" : "계정이 있으신가요?"}
            <a onClick={signup} className="font-bd underline">
              {!selectSignup ? "이메일로 회원가입하기" : "로그인하기"}
            </a>
          </div> */}
                    <div>
                        <div className="flex gap-1 text-gray-8 text-xs">
                            가입하지 않으셨나요?
                            <a onClick={signup} className="font-bd underline">
                                이메일로 회원가입하기
                            </a>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}
