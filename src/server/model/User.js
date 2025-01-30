import db from '../config/db.js';  // MySQL 연결 객체

// 특정 이메일로 사용자 조회하는 함수
export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM userinfo WHERE userid = ?';  // 이메일로 사용자 정보 조회
    db.query(query, [email], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
