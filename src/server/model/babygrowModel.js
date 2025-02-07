import db from '../config/db.js';  // MySQL 연결 객체

// 이메일로 사용자 정보 조회
export const babygrowModel = (babyid) => {
    console.log('grow model 에서 user',babyid)
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM babygrow WHERE babyid = ?';  // 이메일을 기준으로 사용자 조회
    db.query(query, [babyid], (err, result) => {  // 쿼리 실행
      if (err) reject(err);
      else resolve(result); // 결과 반환
    });
  });
};
