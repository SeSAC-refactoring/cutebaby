import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Mypage from './pages/Mypage';
import KakaoLogin from './components/login-page/KakaoLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import Vaccination from './pages/Vaccination';
import { useEffect } from 'react';
import { loadKakaoSDK } from './services/loadKakaoSDK';
import Header from './components/commons/Header';
import SelectLogin from './pages/SelectLogin';
import GrowthDiary from './pages/GrowthDiary';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/commons/Footer';

export interface UserData {
    userid: number;
    username: string;
    email: string;
}

function App() {
    useEffect(() => {
        loadKakaoSDK();
        // .then(() => console.log("Kakao SDK 준비 완료"))
        // .catch((error) => console.error("Kakao SDK 로드 실패:", error));
    }, []);

    // 모바일일 때 키보드가 올라오면 그만큼 화면높이 줄이기
    useEffect(() => {
        const handleResize = () => {
            // body의 height 값을 window.innerHeight로 설정
            document.body.style.height = `${window.innerHeight}px`;
        };

        handleResize();
        window.addEventListener('resize', handleResize); // 윈도우 크기 변경 감지 (키보드가 올라오거나 화면이 변경될 때)

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/SelectLogin" element={<SelectLogin />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/GrowthDiary" element={<GrowthDiary />} />
                <Route path="/Vaccination" element={<Vaccination />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
