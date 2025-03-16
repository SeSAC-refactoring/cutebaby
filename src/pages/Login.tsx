import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/commons/Input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBabyInfo } from '../store/babySlice';
import { AppDispatch, RootState } from '../store';
import { fetchgrowInfo } from '../store/GrowthDiarySlice';
import Loading from '../components/home-page/Loading'; // 로딩 컴포넌트 추가

// 사용자 정보 인터페이스 정의
interface UserInfo {
    username: string;
    userid: string;
    password: string;
}

const EmailLogin: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>('test@sesac.com'); // 이메일 상태관리하기
    const [inputpassword, setinputPassword] = useState<string>('testuser1!'); // 비밀번호 상태관리하기
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // 사용자 정보 상태관리하기
    const [error, setError] = useState<string>(''); // 에러 상태
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가
    const navigate = useNavigate();
    const babyInfo = useSelector((state: RootState) => state.baby.babyInfo);
    const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);

    // 로그인 되어있을 시 // 홈페이지로 리디렉션
    const user = sessionStorage.getItem('user');
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });

    // 로그인 성공 시 babyInfo 가져오기
    useEffect(() => {
        if (userInfo) {
            dispatch(fetchBabyInfo());
        }
    }, [userInfo, dispatch]);

    // babyInfo가 변경되면 growInfo 가져오기
    useEffect(() => {
        if (userInfo) {
            const fetchGrowData = async () => {
                try {
                    setLoading(true); // 로딩 시작

                    if (babyInfo.length > 0) {
                        await dispatch(fetchgrowInfo(babyInfo)); // growInfo 가져오기
                    } else if (babyInfo.length == 0) {
                        // babyInfo가 없으면 로딩 종료 후 메인 페이지로 이동
                        setLoading(false);
                        gotoMain();
                    }
                } catch (error) {
                    // console.error('growInfo 가져오기 실패:', error);
                } finally {
                    setLoading(true); // 로딩 종료
                    gotoMain(); // 메인 페이지로 이동
                }
            };

            fetchGrowData();
        }
    }, [babyInfo, userInfo, dispatch]);

    // 이메일 입력값 처리 함수 설정
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // 비밀번호 입력값 처리 함수 설정
    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputPassword(e.target.value);
    };

    // 엔터 키로 로그인
    const enter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == 'Enter') {
            handleSubmit(new Event('submit') as unknown as React.FormEvent);
        }
    };

    // 이메일로 사용자 정보 조회
    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true); // 로딩 시작
        const API_URL = process.env.REACT_APP_API_URL;
        e.preventDefault(); // 페이지 새로 고침 방지

        try {
            const emailPost = await axios.post(`${API_URL}/user`, {
                email,
                inputpassword,
            });

            if (emailPost.data.length > 0) {
                const user = emailPost.data[0];
                sessionStorage.setItem('user', JSON.stringify(user)); // 사용자 정보를 sessionStorage에 저장
                sessionStorage.setItem(
                    'usernumber',
                    JSON.stringify(emailPost.data[0].usernumber)
                );
                sessionStorage.setItem('useremail', emailPost.data[0].userid);
                sessionStorage.setItem('username', emailPost.data[0].username);

                if (emailPost.data[0].password !== inputpassword) {
                    setLoading(false);
                    setError('비밀번호가 일치하지 않습니다.');
                } else {
                    setUserInfo(emailPost.data[0]); // 사용자 정보 설정
                    setError(''); // 에러 초기화
                }
            } else {
                setLoading(false);
                setError('사용자를 찾을 수 없습니다.');
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                if (err.response && err.response.status === 404) {
                    setLoading(false);
                    setError('사용자를 찾을 수 없습니다.');
                } else {
                    setLoading(false);
                    setError('서버 오류가 발생했습니다.');
                }
            } else {
                setLoading(false);
                setError('알 수 없는 오류가 발생했습니다.');
            }
            setUserInfo(null); // 오류 발생 시 사용자 정보 초기화
        }
    };

    // 메인 페이지로 이동
    const gotoMain = () => {
        navigate('/', { state: userInfo });
    };

    return (
        <main>
            {/* 로딩 창 */}
            {loading && <Loading />}

            <section className="authWrap loginFormWrap">
                <h2>이메일로 로그인하기</h2>
                <section onKeyDown={enter} className="formContentsArea">
                    <div className="inputArea">
                        <Input
                            label="이메일"
                            type="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="이메일을 입력해주세요."
                        />
                        <Input
                            label="비밀번호"
                            type="password"
                            value={inputpassword}
                            onChange={handleInputPassword}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        {error && <p>{error}</p>}
                    </div>

                    <div className="formBtnArea">
                        <Link
                            to="/SelectLogin"
                            className="w-full button button-yellow button-lg"
                        >
                            취소
                        </Link>
                        <button
                            className="button-black button-lg w-full"
                            onClick={handleSubmit}
                        >
                            완료
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default EmailLogin;
