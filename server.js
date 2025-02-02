import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 5001;
app.use(cors()); 


// ✅ JSON과 URL-encoded 데이터를 처리하는 미들웨어 설정
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  


app.use(cors({
  origin: 'http://localhost:3000', // React 앱 주소
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes); 

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
