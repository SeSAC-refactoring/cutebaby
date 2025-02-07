import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import session from 'express-session';
import router from "./routes/userRoutes.js";


const app = express();
const port = 5001;
app.use(cors()); 


app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  


app.use("/uploads", express.static("uploads"));
app.use("/api", router);

app.use(cors({
  origin: 'http://localhost:3000', // React 앱 주소
  credentials: true
}));
app.use(session({
  secret: 'keroro2424.',  // 세션 암호화 키
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // 개발환경에서는 secure: false, https에서는 true로 설정
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes); 

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
