import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Mypage from "./pages/Mypage";
import KakaoLogin from "./components/login-page/KakaoLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Vaccination from "./pages/Vaccination";
import { useEffect } from "react";
import { loadKakaoSDK } from "./services/loadKakaoSDK";
import Header from "./components/commons/Header";
import SelectLogin from "./pages/SelectLogin";
import GrowthDiary from "./pages/GrowthDiary";
import { NotFound } from "./pages/NotFound";

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
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
                <Route path="/GrowthDiary" element={<GrowthDiary />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Vaccination" element={<Vaccination />} />
                <Route path="/SelectLogin" element={<SelectLogin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );

}

export default App;
