// import { fetchUsers, UserDataset } from './services/userService';
// import Signup from "./components/Signup";
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Mypage from './pages/Mypage';
import KakaoLogin from './components/login-page/KakaoLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import Vaccination from './pages/Vaccination';
// import Header from "./components/Header";
import { useEffect } from 'react';
import { loadKakaoSDK } from './services/loadKakaoSDK';
import VaccinationCenters from './pages/VaccinationCenters';
// import { VaccinationDetails } from "./components/vaccination-page/VaccinationDetails";

import Header from './components/commons/Header';
import VaccinationDetails from './pages/VaccinationDetails';
// import VaccinationUnit from "./pages/vaccination_centers_unit";
import SelectLogin from './pages/SelectLogin';
import GrowthDiary from './pages/GrowthDiary';
import VaccinationUnit from './pages/vaccination_centers_unit';
import { CenterList } from './components/vaccination-page/CenterList';
import { CalculateInputArea } from './components/growth-diary-page/CalculateInputArea';
import { RecentGrowthRecord } from './components/growth-diary-page/RecentGrowthRecord';
import { useGrowData } from './components/growth-diary-page/hooks/useGrowData';

// import GrowthDiary from "./components/GrowthDiary";
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
            <Header></Header>
            <Routes>
                <Route path="/" element={<SelectLogin />}></Route>
                <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
                <Route path="/GrowthDiary" element={<GrowthDiary />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Vaccination" element={<Vaccination />} />
                <Route path="/SelectLogin" element={<SelectLogin />} />
                {/* <Route path="/VaccinationDetails" element={<VaccinationDetails />} />
        <Route path="/VaccinationCenters" element={<VaccinationCenters />} /> */}
            </Routes>
        </>
    );
}

export default App;
