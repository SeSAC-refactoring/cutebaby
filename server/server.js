//가끔 5001번포트를 사용하는 경우가 있음 그럼 실행이 안댐.
//lsof -i :5001  > PID 찾는거
// kill -9 PID
//명령어 쳐줘야 node server 돌아감

//맨첨에
// npm i express   >> mysql과 node가 연동되게 하는 라이브러리? 같음
// npm i cors >> mysql에 읽기쓰기 같은거 명령어 전달하게 해주는 라이브러리...? 쨋든 필수
// npm i mysql >> mysql관련 메서드 사용할라면 써야됨
// npm i axios  >> http 통신하게 할려고 했던거 같음
//
// 위에꺼 다하고 node server.js 입력
//
// 서버가 http://localhost:5001에서 실행 중입니다.
// MySQL 서버에 연결되었습니다!
//
// 이렇게 나오면 node는 잘 동작

import express, { json, urlencoded } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
const port = 5001;

// CORS 설정

app.use(cors());
app.use(json()); // JSON 형식의 요청 본문을 파싱하는 미들웨어 추가
app.use(urlencoded({ extended: true }));

// MySQL 연결하기 >> 여기부터
const db = createConnection({
    host: '219.251.60.108',
    user: 'sesacUser',
    password: 'keroro2424.',
    database: 'sesacproject',
    port: 3306,
});
// 여기까지 절대 변경금지

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        return;
    }
    console.log('MySQL 에 드뎌!!!!');
    console.log('경로 >>>>', app._router.stack);
});

// 데이터베이스에서 데이터 가져오기 여기 쿼리 부분을 수정해서 원하는 데이터들 불러오고 그걸 store에 저장해야할듯
app.get('/api/user', (req, res) => {
    db.query(`SELECT * FROM sesacproject.userinfo`, (err, results) => {
        if (err) {
            res.status(500).send('데이터베이스 쿼리 오류');
            console.log(results);

            return;
        }
        res.json(results); // 클라이언트에 데이터 반환 >> 이거 값이 react로 넘어감 >> 평소 api연동하듯이 호출해서 사용하면 됨.
    });
});

// 백엔드 코드 수정
app.post('/api/getPosts', (req, res) => {
    console.log('Request body:', req.body); //request  잘되는지 확인
    const { userid } = req.body; //입력받아온값을 저장

    const getUserNumberQuery =
        'SELECT usernumber FROM userinfo WHERE userid = ?'; // mysql로 보내는 쿼리문

    db.query(getUserNumberQuery, [userid], (err, result) => {
        //db에 보내는 쿼리는 (요청 쿼리문 , [같이 보내는 값 = 쿼리문 안에 ?에 들어가는값 ] , 콜백받는 값)
        if (err) {
            console.error('userInfo 조회 실패:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('result >>>>', result);
        console.log(result[0].usernumber);

        const usernumber = result[0].usernumber;

        const getUserPostsQuery =
            'SELECT * FROM user_post WHERE usernumber = ?';
        db.query(getUserPostsQuery, [usernumber], (err, posts) => {
            if (err) {
                console.error('usernumber 조회 못함:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json(posts); // 게시글 데이터를 클라이언트로 반환
        });
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`); // 여기 로컬은 node가 로컬에서 돌아간다는거
});
