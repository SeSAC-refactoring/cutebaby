// import { fetchUsers, UserDataset } from './services/userService';
// import Signup from "./components/Signup";

// import GrowthDiary from "./components/GrowthDiary";

export interface UserData {
  userid: number;
  username: string;
  email: string;
}

function App() {
  useEffect(() => {
    loadKakaoSDK()
      .then(() => console.log("Kakao SDK 준비 완료"))
      .catch((error) => console.error("Kakao SDK 로드 실패:", error));
  }, []);
  return (
    <div className="App">
      <h1>꼬물꼬물</h1>

      <Routes>
        <Route path="/oauth/callback/kakao" element={<KakaoLogin />} />
        <Route path="/GrowthDiary" element={<GrowthDiary />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Vaccination" element={<Vaccination />} />
        <Route path="/VaccinationDetails" element={<VaccinationDetails />} />
        <Route path="/VaccinationCenters" element={<VaccinationCenters />} />
      </Routes>
      <Header></Header>
    </div>
  );
}

export default App;
