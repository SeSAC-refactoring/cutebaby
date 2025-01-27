import { useEffect, useState } from 'react';
import axios from 'axios'
import LoginTest from './LoginTest';
import Posttest from './Posttest';
// import test from './Test.js';


function App() {
  const [data, setData] = useState([]); // 이거는 계정 전체 조회
  

  useEffect(() => {
    axios.get('http://localhost:5001/api/user')
      .then((response) => {
        setData(response.data);  // 데이터를 state에 저장

        console.log(response.data)
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
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
        <LoginTest data={data}></LoginTest>
      <hr />
        <Posttest></Posttest>
    </div>
  );
}

export default App;
