import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// 특정 이메일로 사용자 조회하는 함수
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM userinfo WHERE userid = ?';  // ?에 userid를 얻어와서 넣음 userinfo테이블에 userid가 ? 인애를 찾음
    db.query(query, [email], (err, result) => { //db에 요청하는 코드 (쿼리문 , 같이 전달할 값 , 리턴받는값)
      if (err) reject(err);
      else resolve(result); //에러가 안났으면 결과값 보내주는거
    });
  });
};
