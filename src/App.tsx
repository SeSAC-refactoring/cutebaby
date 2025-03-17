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
