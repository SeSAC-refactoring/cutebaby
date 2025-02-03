// import { fetchUsers, UserDataset } from './services/userService';
// import Signup from "./components/Signup";
import EmailLogin from './components/login-page/EmailLogin';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import GrowthDiary from './pages/GrowthDiary';
import { GrowthDiaryPage } from './components/growth-diary-page/GrowthDiaryPage';
import { AiChatComponent } from './components/home-page/AiChatComponent';
import Mypage from './pages/Mypage';
import KakaoLogin from './components/KakaoLogin';
import { VaccineDetails } from './components/vaccination-page/VaccineDetails';
import { VaccinationCenters } from './components/vaccination-page/VaccinationCenters';

export interface UserData {
    userid: number;
    username: string;
    email: string;
}

function App() {
    return (
        <div className="App">
            <h1>MySQL 데이터 test</h1>
            <hr />
            <Routes>
                <Route path="/" element={<EmailLogin />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
            </Routes>

            <Signup></Signup>
            <VaccinationCenters />

            {/* <hr />
      <Login />

      <hr />
      <Signup />

      <hr />
      <Home />

      <hr />
      <Vaccination />

      <hr />
      <GrowthDiary />

      <hr />
      <Mypage /> */}
        </div>
    );
}

export default App;
