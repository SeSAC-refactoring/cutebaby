import React, { useEffect } from 'react';
import { fetchVaccinationDiseaseList } from './api-data/vaccinationDiseaseList';
import { fetchVaccinationInfo } from './api-data/vaccinationDiseaseInfo';

function App() {
    useEffect(() => {
        fetchVaccinationDiseaseList().then((list) => {
            console.log(list);
        });
        fetchVaccinationInfo(3).then((list) => {
            console.log(list);
        });
    }, []);

    return (
        <div className="App">
            <h1>TS로 React</h1>
        </div>
    );
}

export default App;
