import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js'; 

// .env 파일 로드
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS 설정 (Netlify 프론트와 연결)
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS 정책 위반'));
    }
  },
  credentials: true
}));


// JSON 및 URL 인코딩 데이터 처리
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET, // 보안을 위해 .env에서 관리
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // HTTPS 배포 시 true로 변경
}));

// API 라우트 설정
app.use('/api', userRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`✅ 서버가 실행 중: http://localhost:${port} (포트: ${port})`);
});
