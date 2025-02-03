// import { fetchUsers, UserDataset } from './services/userService';
// import Signup from "./components/Signup";
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import GrowthDiary from './pages/GrowthDiary';
import { GrowthDiaryPage } from './components/growth-diary-page/GrowthDiaryPage';
import { AiChatComponent } from './components/home-page/AiChatComponent';
import Mypage from './pages/Mypage';
import KakaoLogin from './components/login-page/KakaoLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import Vaccination from './pages/Vaccination';
import Header from './components/Header';
import VaccinationHospital from './pages/VaccinationHospital';
import VaccinationDetail from './pages/VaccinationDetail';
import { useEffect } from 'react';
import { loadKakaoSDK } from './services/loadKakaoSDK';
// import GrowthDiary from "./components/GrowthDiary";

export interface UserData {
    userid: number;
    username: string;
    email: string;
}

function App() {
    useEffect(() => {
        loadKakaoSDK()
            .then(() => console.log('Kakao SDK 준비 완료'))
            .catch((error) => console.error('Kakao SDK 로드 실패:', error));
    }, []);
    return (
        <div className="App">
            <h1>꼬물꼬물</h1>
            <hr />
            {/* <Routes>
        <Route path="/" element={<EmailLogin />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
      </Routes> */}

            <Routes>
                <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
                <Route path="/GrowthDiary" element={<GrowthDiary />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Vaccination" element={<Vaccination />} />
                <Route
                    path="/VaccinationDetail"
                    element={<VaccinationDetail />}
                />
                <Route
                    path="/VaccinationHospital"
                    element={<VaccinationHospital />}
                />
            </Routes>

            {/* <Vaccination></Vaccination> */}
            {/* <Signup></Signup> */}
            {/* <GrowthDiaryPage></GrowthDiaryPage> */}
            <Header></Header>
            {/* <AiChatComponent></AiChatComponent> */}
            {/* <Login></Login> */}
        </div>
    );
}

export default App;
