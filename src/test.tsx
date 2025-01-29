// import { useEffect, useState } from 'react';
// import { fetchUsers, UserData } from './services/userService';
// import LoginTest from './pages/LoginTest';
// import Posttest from './pages/Posttest';
// import KakaoLogin from './pages/KakaoLogin';
// import { getKakaoLoginUrl } from './services/kakaoService';


// function App() {
//   const [data, setData] = useState<UserData[]>([]);

//   useEffect(() => {
//     fetchUsers()
//       .then(setData)
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div className="App">
//       <h1>MySQL 데이터 test</h1>
//       <hr />
//       <h2>SQL에 저장된 계정들</h2>
//       <ul>
//         {data.map((item) => (
//           <li key={item.userid}>{JSON.stringify(item)}</li>
//         ))}
//       </ul>
//       <hr />
//       <LoginTest data={data} />
//       <hr />
//       <Posttest />
//       <hr />

//       <a href={getKakaoLoginUrl()}>
//         <img src="img/kakaoLoginImg.png" alt="카카오 로그인" />
//       </a>
//       <KakaoLogin></KakaoLogin>
//     </div>
//   );
// }

// export default App;
