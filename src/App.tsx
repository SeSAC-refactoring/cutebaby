// import { fetchUsers, UserDataset } from './services/userService';
// import Signup from "./components/Signup";
import EmailLogin from "./components/login-page/EmailLogin";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import GrowthDiary from "./pages/GrowthDiary";
import { GrowthDiaryPage } from "./components/growth-diary-page/GrowthDiaryPage";
import { AiChatComponent } from "./components/home-page/AiChatComponent";
import Mypage from "./pages/Mypage";
import KakaoLogin from "./components/login-page/KakaoLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Vaccination from "./pages/Vaccination";
import Header from "./components/Header";
import VaccinationHospital from "./pages/VaccinationHospital";
import VaccinationDetail from "./pages/VaccinationDetail";
// import GrowthDiary from "./components/GrowthDiary";

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
        <Route path="/VaccinationDetail" element={<VaccinationDetail />} />
        <Route path="/VaccinationHospital" element={<VaccinationHospital />} />
      </Routes>

      {/* <Mypage /> */}
      {/* <Signup></Signup> */}
      {/* <GrowthDiaryPage></GrowthDiaryPage> */}
      <Header></Header>
      {/* <AiChatComponent></AiChatComponent> */}
      {/* <Login></Login> */}
      {/* <VaccinationDetail></VaccinationDetail> */}
      {/* <Home></Home> */}
    </div>
  );
}

export default App;
