import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const delgrowModel = (id) => {
  console.log('model에서 확인',id)
  return new Promise((resolve, reject) => {
    const query = `
     DELETE FROM babygrow WHERE id = ?
    `;
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
