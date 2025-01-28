import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginTest from './LoginTest';
import Posttest from './Posttest';
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

export interface UserData {
    userid: number;
    username: string;
    email: string;
}

function App() {
    // 데이터의 타입을 UserData 배열로 설정
    const [data, setData] = useState<UserData[]>([]);

    useEffect(() => {
        axios
            .get<UserData[]>('http://localhost:5001/api/user')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('데이터 가져오기 오류:', error);
            });

        //////////////////////////////////////////////////////////
        // API 데이터 가져오기 확인

        // fetchVaccinationDiseaseList().then((list) => {
        //     console.log(list);
        // });
        // fetchVaccinationInfo(10).then((list) => {
        //     console.log(list);
        // });

        // fetchProvince().then((list) => {
        //     console.log(list);
        // });
        // fetchCity(1100000000).then((list) => {
        //     console.log(list);
        // });
        // const pagenumber = 1;
        // const province = 1100000000;
        // const city = 11110;
        // const searchType = 'ORG'; // 'ADDR'
        // const searchWord = '서울';
        // fetchVaccinationCenters(
        //     pagenumber,
        //     province,
        //     city,
        //     searchType,
        //     searchWord
        // ).then((list) => {
        //     console.log('병원정보', list);
        // });

        // fetchGrowthChartLms().then((list) => {
        //     console.log('fetchGrowthChartLms', list);
        // });
        fetchGrowthChartPercentile().then((list) => {
            console.log('fetchGrowthChartPercentile', list);
        });
        //////////////////////////////////////////////////////////
    }, []);

    return (
        <div className="App">
            <h1>MySQL 데이터 test</h1>
            <hr />
            <h2>sql에 저장된 계정들</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
            <hr />
            <LoginTest data={data} />
            <hr />
            <Posttest />
        </div>
    );
}

export default App;
