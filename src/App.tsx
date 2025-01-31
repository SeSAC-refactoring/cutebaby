// import { fetchUsers, UserDataset } from './services/userService';
import TestMain from './components/TestMain';
// import Signup from "./components/Signup";
import EmailLogin from './components/EmailLogin';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import GrowthDiary from './pages/GrowthDiary';
import { GrowthDiaryPage } from './components/growth-diary-page/GrowthDiaryPage';
import { AiChatComponent } from './components/home-page/AiChatComponent';
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
            <Routes>
                <Route path="/" element={<EmailLogin />} />
                <Route path="/TestMain" element={<TestMain />} />
            </Routes>
            <AiChatComponent></AiChatComponent>
            <Signup></Signup>
            {/* <GrowthDiaryPage></GrowthDiaryPage> */}
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
