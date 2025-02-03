import db from '../config/db.js';  // MySQL 연결 객체

// 이메일로 사용자 정보 조회
export const babyinfoModel = (usernumber) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM babyinfo WHERE usernumber = ?';  // 이메일을 기준으로 사용자 조회
    db.query(query, [usernumber], (err, result) => {  // 쿼리 실행
      if (err) reject(err);
      else resolve(result); // 결과 반환
    });
  });
};
