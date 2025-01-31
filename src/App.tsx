import { useEffect, useState } from 'react';
import axios from 'axios';
// import { fetchUsers, UserDataset } from './services/userService';
import LoginTest from './pages/LoginTest';

import { Route,BrowserRouter, Routes } from 'react-router-dom';
import TestMain from './pages/TestMain';

import {
    fetchVaccinationDiseaseList,
    fetchVaccinationInfo,
} from './api-data/vaccinationDisease';
import {
    fetchProvince,
    fetchCity,
    fetchVaccinationCenters,
} from './api-data/vaccinationCenters';
import {
    fetchGrowthChartLms,
    fetchGrowthChartPercentile,
} from './api-data/growthChart';
import { VaccinationPage } from './pages/VaccinationPage';
import { GrowthDiaryPage } from './pages/growth-diary-page/GrowthDiaryPage';
import Signup from './pages/Signup';
import EmailLogin from './pages/EmailLogin';
import Mainpage from './pages/Mainpage';

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
    
            <hr />
            <Signup></Signup>
            <hr />

        </div>
    );
}

export default App;
